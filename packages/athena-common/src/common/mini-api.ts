import Taro, {eventCenter} from '@tarojs/taro'

/**
 * @author 潘维吉
 * @date 2019-07-02 17:17
 * 小程序API 封装工具类
 */
export class MiniApi {

  /**
   * 微信alert弹出框Promise封装
   */
  static alert = (title, content, confirmText = '确认') => new Promise((resolve, reject) => {
    Taro.showModal({
      title,
      content,
      confirmText,
      showCancel: false,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  });

  /**
   * 微信confirm弹出框Promise封装
   */
  static confirm = (title, content, confirmText = '确认', cancelText = '取消') =>
    new Promise<any>((resolve, reject) => {
      Taro.showModal({
        title,
        content,
        confirmText,
        cancelText,
        showCancel: true,
        success(res) {
          resolve(res)
        },
        fail(error) {
          reject(error)
        }
      })
    });

  /**
   * 微信自带showToast
   */
  static showToast = (title, icon: 'success' | 'loading' | 'none' = 'none', duration = 2500) => {
    Taro.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  };

  /**
   * 微信登录Promise封装
   */
  static login = () => new Promise<any>((resolve, reject) => {
    const systemInfo = Taro.getStorageSync('systemInfo');
    // 企业微信固定返回wxwork 微信不返回该字段
    if (systemInfo.environment === "wxwork") {
      wx.qy.login({
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    } else {
      Taro.login({
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    }
  });

  /**
   * 获取微信用户信息Promise封装
   */
  static getUserInfo = (obj) => new Promise<any>((resolve, reject) => {
    const systemInfo = Taro.getStorageSync('systemInfo');
    // 企业微信固定返回wxwork 微信不返回该字段
    if (systemInfo.environment === "wxwork") {
      wx.qy.getEnterpriseUserInfo({
        ...obj,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    } else {
      Taro.getUserInfo({
        ...obj,
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    }
  });

  /**
   * 获取地理位置Promise封装
   */
  static getLocation = () => new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'wgs84',
      success(res) {
        Taro.setStorageSync('longitude', res.longitude); // 经度
        Taro.setStorageSync('latitude', res.latitude); // 纬度
        resolve(res)
      },
      fail() {
        // 如果定位失败 默认北京
        reject({
          longitude: 116.38,
          latitude: 39.90
        })
      }
    })
  });

  /**
   * ​使用微信内置地图查看位置Promise封装
   */
  static openLocation = (longitude: number, latitude: number) => new Promise((resolve, reject) => {
    Taro.openLocation({
      latitude,
      longitude,
      scale: 28, // 放比例，范围5~18，默认为18
      success(res) {
        resolve(res);
      },
      fail(e) {
        reject(e);
      }
    })
  });

  /**
   * 选择地理位置Promise封装
   */
  static chooseLocation = () => new Promise<any>((resolve, reject) => {
    Taro.chooseLocation({
      success(res) {
        resolve(res)
      },
      fail(e) {
        reject(e)
      }
    })
  });

  /**
   * 打开相机或者相册
   */
  static uploadActionSheet = () => new Promise((resolve, reject) => {
    Taro.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res: any) => {
        MiniApi.chooseImage(res.tapIndex).then((result) => {
          resolve(result)
        })
      },
      fail: (error) => {
        reject(error);
        console.error(error);
      }
    })
  });

  /**
   * 直接打开相机相册 Promise封装
   *
   * type 0 相机 1 相册   默认相机相册都有
   */
  static chooseImage = (type?: number | 'default', count = 6, isUpload = true) => new Promise<any>((resolve, reject) => {
    let sourceType;
    switch (type) {
      case 0:
        sourceType = ['camera'];
        break;
      case 1:
        sourceType = ['album'];
        break;
      default:
        sourceType = ['album', 'camera'];
        break;
    }
    Taro.chooseImage({
      count: count, // 默认6
      sizeType: ['compressed'], // 只用压缩上传  original 原图，compressed 压缩图，默认二者都有
      sourceType: sourceType, // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) => {
        if (isUpload) {
          // 上传文件
          MiniApi.uploadFile(res).then(result => {
            resolve(result)
          })
        }
        resolve(res);
      },
      fail: (error) => {
        reject(error);
        console.error(error);
      }
    })
  });

  /**
   * 上传文件Promise封装
   */
  static uploadFile = (res) => new Promise<string[]>((resolve, reject) => {
    let imageUrls: string[] = []; // 上传返回的图片数组
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    let tempFilePaths = res.tempFilePaths;

    tempFilePaths.map(async (item, index) => {
      Taro.showLoading({
        title: '正在上传',
        mask: true // 防止触摸穿透
      })

      await Taro.uploadFile({
        url: `${process.env.API_SERVER}/api/upload`, // 接口地址
        filePath: item, // 要上传文件资源的路径
        name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        formData: {
          fileName: Taro.getStorageSync('userInfo').userName
        }, // HTTP 请求中其他额外的 form data
        header: {'authorization': 'Bearer ' + Taro.getStorageSync('token')}, // 授权
        success: (res) => {
          if (process.env.IS_DEBUG) console.log(JSON.parse(res.data));
          let {code, data, msg} = JSON.parse(res.data);
          if (code === 200) {
            imageUrls.push(data)
            // 多图片最后一张上传成功
            if (tempFilePaths.length === index + 1) {
              setTimeout(() => {
                resolve(imageUrls)
                //MiniApi.showToast("图片上传成功","success");
              }, 600)
            }
          } else {
            MiniApi.showToast(msg);
          }
        },
        fail: (error) => {
          MiniApi.showToast('上传失败');
          reject(error)
          console.error(error)
        },
        complete: () => {
          Taro.hideLoading();
        }
      })
    })
  });

  /**
   * 预览图片Promise封装
   */
  static previewImage = (urls, current = '') => {
    Taro.previewImage({
      urls, // 需要预览的图片http链接列表 数组
      current, // 当前显示图片的http链接 不填则默认为 urls 的第一张
    })
  };

  /**
   * 微信小程序WebSocket 连接
   */
  static webSocket = () => {
    // 登录后建立websocket 连接
    const userId = Taro.getStorageSync('userId');
    if (!userId) return;

    // 创建 WebSocket 连接
    const connectSocket = () => {
      Taro.connectSocket({
        url: `${process.env.WS_SERVER}/websocket?userId=${userId}`,
        success: () => {
          // 监听 WebSocket 打开
          Taro.onSocketOpen(() => {
            //	发送 WebSocket 消息
            /*            Taro.sendSocketMessage({
                          // data: stringToUint(JSON.stringify({type: "", msg: "小程序发送的Socket消息"}))
                          data: "小程序发送的Socket消息"
                        })*/
            // 心跳检测
            heartCheck.start();

            // 接收 WebSocket 消息
            Taro.onSocketMessage((res) => {
              try {
                let result = JSON.parse(res.data);
                if (result.key != 'open') eventCenter.trigger(`webSocket:${result.key}`, result.data);
                console.log(result);
              } catch (e) {
                console.error('WebSocket接收消息JSON解析失败');
              }
              // 心跳检测重连
              heartCheck.reset();
            })
          })
        }
      })
    }

    // 执行WebSocket连接相关操作
    connectSocket();

    // WebSocket连接打开失败
    Taro.onSocketError(() => {
      console.error('WebSocket连接打开失败，请检查！');
    })

    // 监听WebSocket关闭
    Taro.onSocketClose(() => {
      console.error('WebSocket 已关闭！');
      // 重新连接Socket
      resetConnectSocket();
    });

    let resetTimeOut;
    // 重新连接Socket
    const resetConnectSocket = () => {
      // 登录后建立websocket 连接
      if (!userId) return;
      if (resetTimeOut) clearTimeout(resetTimeOut);
      resetTimeOut = setTimeout(() => {
        connectSocket();
      }, 10000)
    }

    // 失去连接 断网的情况的心跳重连
    const heartCheck = {
      // 60秒 onSocketMessage获取到了服务端的消息重置倒计时, 距离上次获取消息超过60秒钟之后, 执行心跳检测, 查看是否Socket断开连接了
      timeout: 60000,
      timeoutObj: 0,

      // 心跳开始检测
      start() {
        this.timeoutObj = setTimeout(() => {
          //	发送 WebSocket 消息
          Taro.sendSocketMessage({
            data: 'HeartBeat心跳检测重连'
          })
        }, this.timeout)
      },

      // 心跳重连
      reset() {
        clearTimeout(this.timeoutObj);
        this.start();
      }
    }
  };

  /**
   * 监听网络状态变化
   */
  static networkStatusChange = () => {
    Taro.onNetworkStatusChange(res => {
      let title = '';
      if (res.isConnected) {
        if (res.networkType == '2g' || res.networkType == '3g') title = '当前2G或3G网络 为了不影响您使用 请切换4G或wifi'
      } else {
        title = '网络无法连接 请检查网络设置'
      }
      if (title != '') {
        MiniApi.showToast(title);
      }
    })
  };

  /**
   * 监听小程序版本更新
   */
  static checkForUpdate = () => {
    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    const updateManager = Taro.getUpdateManager();

    // 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    updateManager.onUpdateReady(() => {
      MiniApi.confirm('更新提示', '新版本已经准备好，是否更新重启应用？',
        '立即更新', '稍后更新').then(res => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      });

      // 监听小程序更新失败事件。小程序有新版本，客户端主动触发下载（无需开发者触发），下载失败（可能是网络原因等）后回调
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
        MiniApi.showToast('新版本下载失败')
      })
    })
  };

  /**
   * 打电话
   */
  static makePhoneCall = (phoneNumber, userName, isShowConfirm = true) => {
    if (!/^1[3456789]\d{9}$/.test(phoneNumber)) return;
    if (isShowConfirm) {
      MiniApi.confirm('打电话', `是否拨打 ${userName} 的电话 ${phoneNumber}`, '拨打').then(res => {
        if (res.confirm) {
          Taro.makePhoneCall({
            phoneNumber: phoneNumber
          })
        }
      })
    } else {
      Taro.makePhoneCall({
        phoneNumber: phoneNumber
      })
    }
  };

  /**
   * 同步获取系统信息
   */
  static getSystemInfo = () => {
    try {
      const res = Taro.getSystemInfoSync();
      Taro.setStorageSync('systemInfo', res);// 系统信息
    } catch (e) {
      // Do something when catch error
    }
  };

  /**
   * 添加手机通讯录联系人
   */
  static addPhoneContact = (object) => {
    Taro.addPhoneContact(object)
  };

  /**
   * 设置系统剪贴板的内容
   */
  static setClipboardData = (data) => {
    Taro.setClipboardData({
      data,
      /*      success (res) {
              Taro.getClipboardData({
                success (res) {
                  console.log(res.data) // data
                }
              })
            }*/
    })
  };

  /**
   * 调起客户端扫码界面进行扫码
   */
  static scanCode = () => new Promise<any>((resolve, reject) => {
    Taro.scanCode({
      onlyFromCamera: true,
      success(res) {
        resolve(res);
      },
      fail(e) {
        reject(e);
      }
    })
  });
}
