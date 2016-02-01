/**
 * Template extendable object, all the templates are stored here.
 * @type {Object}
 */
export default Template = {};

/**
 * Run through a list or object with the iteratee method.
 * @param  {Any}      list     The list or object to be used.
 * @param  {Function} iteratee The method to use on each element.
 * @param  {Object}   context  The context to use in the iteratee.
 * @return {Array}             An array containing the return of all iteratee.
 */
export function each(list, iteratee, context) {
  let keys = Object.keys(list);
  let arr = keys.map((key, index) => {
    return iteratee.call(context, list[key], key, index);
  });
  arr.__proto__ = {
    else(elseblock) {
      if (this.length == 0) {
        return elseblock;
      }
      return this;
    }
  }
  return arr;
}

/**
 * Show block if truth, hide if falsey.
 * @param  {Boolean}  truth Expression
 * @param  {Any}      block Function, String or React Element.
 * @return {Any}            Returns the block if truth.
 */
export function when(truth, block) {
  let obj = {
    else(elseblock) {
      return !truth ? elseblock : block;
    }
  };
  if (truth) {
    obj.__proto__ = block;
  }
  return obj;
}
