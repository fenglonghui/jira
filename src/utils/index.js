/*
 * @Author: your name
 * @Date: 2022-03-30 21:19:11
 * @LastEditTime: 2022-03-30 21:38:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jira/src/utils/index.ts
 */

export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好
export const cleanObject = (object) => {
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key]; // 去除对象中key对应的值为空的字段
    }
  });
  return result;
};
