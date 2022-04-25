/**
 * @author 潘维吉
 * @date 2019-07-08 17:10
 * 大小类型定义
 */
export type SizeType = 'large' | 'default' | 'small';

export interface Size {
  [size: string]: string;
}
