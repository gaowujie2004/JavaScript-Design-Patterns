// 和 compose 相反
function pipe(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reduce(
    (a, b) =>
      (...arg) =>
        b(a(...arg))
  );
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
