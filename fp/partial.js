function partial(userFn, ...userArgs) {
  return function wrapUserFn(...lastArgs) {
    return userFn(...userArgs, ...lastArgs);
  };
}

function add(x, y) {
  return x + y;
}

function pow(x, y) {
  return Math.pow(x, y);
}

function double(x) {
  return x * 2;
}
