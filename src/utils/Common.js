/*
 * @Description:
 * @Autor: dongjunhua
 * @Date: 2021-01-20 09:34:35
 * @LastEditors: dongjunhua
 * @LastEditTime: 2021-01-20 11:17:54
 */

class Common {
  static deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
    return targetObj;
  }
}

export default Common;
