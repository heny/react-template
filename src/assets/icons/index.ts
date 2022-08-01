import _ from 'lodash';
/**
 * 将所有图标以文件名驼峰形式的 key 输出
 * 如：circle-error.svg 对应 circleError
 */
const r = require.context('./', false, /.*\.svg/);
const icons: any = r.keys().reduce((acc, key) => {
  const iconName: string = key.match(/^\.\/([\w-@]+?)\.svg/)[1];
  return {
    ...acc,
    [_.camelCase(iconName)]: r(key).default,
  };
}, {});

export default icons;
