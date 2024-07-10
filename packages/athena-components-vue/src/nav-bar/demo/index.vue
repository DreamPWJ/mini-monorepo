<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <view
    :class="['global-nav-bar', configStyle.ios ? 'ios' : 'android', extClass, 'global-navbar']"
    :style="{ background: backgroundColorTop || background, height: `${immersive ? 0 : configStyle.navBarHeight + configStyle.navBarExtendHeight}px` }">
    <view class="global-nav-bar__placeholder" :style="{ paddingTop: `${configStyle.navBarHeight + configStyle.navBarExtendHeight}px` }" />
    <view class="global-nav-bar__inner" :style="`${background};${configStyle.navigationbarinnerStyle}`">
      <view class="global-nav-bar__left" :style="configStyle.navBarLeft">
        <template v-if="back && !home">
          <view @click="handleBackClick" class="global-nav-bar__button global-nav-bar__btn_goback" :class="iconTheme" />
        </template>
        <template v-else-if="!back && home">
          <view @click="handleGoHomeClick" class="global-nav-bar__button global-nav-bar__btn_gohome" :class="iconTheme" />
        </template>
        <template v-else-if="back && home">
          <view class="global-nav-bar__buttons">
            <view @click="handleBackClick" class="global-nav-bar__button global-nav-bar__btn_goback" :class="iconTheme" />
            <view @click="handleGoHomeClick" class="global-nav-bar__button global-nav-bar__btn_gohome" :class="iconTheme" />
          </view>
        </template>
        <template v-else>
          <slot name="left" />
        </template>
      </view>
      <view class="global-nav-bar__center" :style="{ paddingLeft: `${rightDistance}px` }">
        <template v-if="title">
          <text>{{ title }}</text>
        </template>
        <template v-else-if="searchBar">
          <view class="global-nav-bar-search" @click="handleSearchClick" :style="{ height: `${capsulePosition.height}px` }">
            <view class="global-nav-bar-search__icon" />
            <view class="global-nav-bar-search__input">{{ searchText }}</view>
          </view>
        </template>
        <template v-else>
          <slot name="center" />
        </template>
      </view>
      <view class="global-nav-bar__right" :style="{ marginRight: `${rightDistance}px` }">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
import './index.css'

import { getRole } from '@/utils'

const _navbarStore = navbarStore();
const _tabBarStore = tabBarStore();

function _isFunction(value) {
  return typeof value === "function" || Object.prototype.toString.call(value) === "[object Function]";
}

function getSystemInfo() {
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    return Taro.globalSystemInfo;
  } else {
    // h5环境下忽略navbar
    if (!_isFunction(Taro.getSystemInfoSync)) {
      return null;
    }
    let systemInfo = Taro.getSystemInfoSync() || {
      model: "",
      system: "",
    };
    let ios = !!(systemInfo.system.toLowerCase().search("ios") + 1);
    let rect;
    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
      if (rect === null) {
        throw "getMenuButtonBoundingClientRect error";
      }
      //取值为0的情况  有可能width不为0 top为0的情况
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw "getMenuButtonBoundingClientRect error";
      }
    } catch (error) {
      let gap = ""; //胶囊按钮上下间距 使导航内容居中
      let width = 96; //胶囊的宽度
      if (systemInfo.platform === "android") {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === "devtools") {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }
      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width,
      };
      console.log("error", error);
      console.log("rect", rect);
    }

    let navBarHeight = "";

    if (!systemInfo.statusBarHeight) {
      //开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      })();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小
    } else {
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      })();
      if (ios) {
        systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight
    systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
    systemInfo.ios = ios; //是否ios
    Taro.globalSystemInfo = systemInfo; //将信息保存到全局变量中,后边再用就不用重新异步获取了
    //console.log('systemInfo', systemInfo);
    return systemInfo;
  }
}

let globalSystemInfo = getSystemInfo();

export default {
  props: {
    extClass: String,
    background: {
      type: String,
      default: "#fff",
    },
    backgroundColorTop: String,
    color: String,
    title: String,
    searchText: String,
    searchBar: Boolean,
    back: Boolean,
    home: Boolean,
    iconTheme: String,
    delta: Number,
    onBack: Function,
    onHome: Function,
    onSearch: Function,
    renderLeft: [Object, Array],
    renderRight: [Object, Array],
    renderCenter: [Object, Array],
    immersive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const globalSystemInfoRef = ref(globalSystemInfo);
    // const configStyle = reactive({
    //   navigationbarinnerStyle: "",
    //   navBarLeft: "",
    //   navBarHeight: 0,
    //   capsulePosition: {},
    //   navBarExtendHeight: 0,
    //   ios: false,
    //   rightDistance: 0,
    // });

    const setStyle = systemInfo => {
      const { statusBarHeight, navBarHeight, capsulePosition, navBarExtendHeight, ios, windowWidth } = systemInfo;

      const { back, home, title, color } = props;

      let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
      let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距

      let navigationbarinnerStyle = [
        `color:${color}`,
        //`background:${background}`,
        `height:${navBarHeight + navBarExtendHeight}px`,
        `padding-top:${statusBarHeight}px`,
        `padding-right:${leftWidth}px`,
        `padding-bottom:${navBarExtendHeight}px`,
      ].join(";");
      let navBarLeft = [];
      if ((back && !home) || (!back && home)) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`, `margin-left:0px`, `margin-right:${rightDistance}px`].join(";");
      } else if ((back && home) || title) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`, `margin-left:${rightDistance}px`].join(";");
      } else {
        navBarLeft = [`width:auto`, `margin-left:0px`].join(";");
      }
      return {
        navigationbarinnerStyle,
        navBarLeft,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        ios,
        rightDistance,
      };
    };

    onMounted(() => {
      if (globalSystemInfoRef.value.ios) {
        globalSystemInfoRef.value = getSystemInfo();
        setStyle(globalSystemInfoRef.value);
      }
      const styleData = setStyle(globalSystemInfoRef.value);
      // 将样式数据存储到pinia中
      _navbarStore.ACTIVES_STATE_NAVBAR(styleData);
    });

    const styleData = setStyle(globalSystemInfoRef.value);
    // 将样式数据存储到pinia中
    _navbarStore.ACTIVES_STATE_NAVBAR(styleData);

    const computedStyle = computed(() => {
      const styleData = setStyle(globalSystemInfoRef.value);
      // 将样式数据存储到pinia中
      _navbarStore.ACTIVES_STATE_NAVBAR(styleData);

      return {
        navigationbarinnerStyle: styleData.navigationbarinnerStyle,
        navBarLeft: styleData.navBarLeft,
        navBarHeight: styleData.navBarHeight,
        capsulePosition: styleData.capsulePosition,
        navBarExtendHeight: styleData.navBarExtendHeight,
        ios: styleData.ios,
        rightDistance: styleData.rightDistance,
      };
    });

    const handleBackClick = () => {
      if (_isFunction(props.onBack)) {
        props.onBack();
      } else {
        const pages = Taro.getCurrentPages();
        if (pages.length >= 2) {
          Taro.navigateBack({ delta: props.delta });
        } else {
          // Taro.navigateBack({ delta: 1 }); // 返回首页
        }
      }
    };

    const handleGoHomeClick = () => {
      _tabBarStore.ACTIVES_STATE_BAR_VISIBLE(true);
      if (_isFunction(props.onHome)) {
        props.onHome();
      } else {
        // const pages = Taro.getCurrentPages();
        Taro.reLaunch({ url: DICT.pages.get(getRole())._head().url });
        // if (pages.length >= 2) {
        //   Taro.navigateBack({ delta: props.delta });
        // } else {
        //   // 返回首页
        // }
      }
    };

    const handleSearchClick = () => {
      if (_isFunction(props.onSearch)) {
        props.onSearch();
      }
    };

    return {
      configStyle: computedStyle,
      handleBackClick,
      handleGoHomeClick,
      handleSearchClick,
      globalSystemInfoRef,
    };
  },
};
</script>
