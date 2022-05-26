const _ = require('lodash');
const fp = require('lodash/fp');

/**================================== 使用 **/

let sayHello = (...str) => `Hello , ${str.join(' And ')}`;
let toUpper = (str) => str.toUpperCase();

const res = fp.compose(sayHello, toUpper)('gaowujie');
console.log(res, '-- 原版');

/**================================== 实现——递归 **/
// a( b( c(1,2,3) ) )
// c function - firstFunction

function composeRecursive(...fns) {
  function innerFn(...args) {
    let invokeFn = fns.pop();

    if (typeof invokeFn === 'function') {
      let res = invokeFn.apply(null, args);
      return innerFn(res);
    } else {
      return args[0];
    }
  }

  return innerFn;
}

/**================================== 实现——循环 **/
function composeWhile(...fns) {
  return (...args) => {
    let invokeFn;
    let ret = fns.pop().apply(null, args);

    while ((invokeFn = fns.pop())) {
      ret = invokeFn(ret);
    }

    return ret;
  };
}

/**================================== 实现——reduceRight **/

function composeRight(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reduceRight(
    (a, b) =>
      (...arg) =>
        b(a(...arg))
  );
}

/**================================== 测试 **/
const res1 = composeRecursive(sayHello, toUpper)('gaowujie');
console.log(res1, '----- recursive');

const res2 = composeWhile(sayHello, toUpper)('gaowujie');
console.log(res2, '----- while');

const res3 = composeRight(sayHello, toUpper, (arg) => arg + '--')('gaowujie');
console.log(res3, '----- reduceRight');
