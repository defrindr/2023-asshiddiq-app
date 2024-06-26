/**
 * ObjectHelper
 */

class ObjectHelper {
  static flat(ob) {
    let result = {};

    for (const i in ob) {
      if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
        const temp = this.flat(ob[i]);
        for (const j in temp) {
          result[i + '.' + j] = temp[j];
        }
      } else {
        result[i] = ob[i];
      }
    }

    return result;
  }
}

export default new ObjectHelper();
