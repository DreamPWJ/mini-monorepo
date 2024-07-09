/**
 * 自定义用户接口
 * 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
 */
export interface User {
  userName: string;
  readonly password?: string | number; // 只读与组合类型 可空
  nickName: string;

  [propName: string]: any; // 任意属性
}
