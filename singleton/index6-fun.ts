// 业务逻辑函数1
function test1() {
  console.log('test111 exec');
  // ......
}

// 业务逻辑函数2
function test2() {
  console.log('test222 exec');
  // ......
}

function createSingleFun<T extends (...args: any[]) => any>(fn: T): T {
  let isExec = false;
  let fnRes: ReturnType<T>;

  const resFn = (...args: any) => {
    if (isExec) {
      return fnRes;
    }

    isExec = true;
    fnRes = fn(...args);
    return fnRes;
  };

  return resFn as T;
}
const test1SingleFn = createSingleFun(test1);

test1SingleFn();
test1SingleFn();
test1SingleFn();
// 只会打印一次
