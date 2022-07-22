declare interface BaseObject<T = any> {
  [key: string]: T;
}

declare type Convert<T> = {
  [K in keyof T]: string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K;
};

/**
 * @description 消除 [x:string]:any
 */
declare type Keys<T extends { [x: string]: any; [x: number]: any }> = Convert<T> extends {
  [_ in keyof T]: infer U;
}
  ? U
  : never;

declare type SafeOmit<T, K extends string | number | symbol> = Exclude<Keys<T>, K> extends keyof T
  ? Pick<T, Exclude<Keys<T>, K>>
  : {};
