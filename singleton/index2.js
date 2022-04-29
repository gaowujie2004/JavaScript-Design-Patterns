/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/**================================== 透明的单例模式 **/

/**
 * 创建一个 单例DIV
 */
var CreateDiv = (() => {
  let instance = null;

  const _CreateDiv = function (htmlStr) {
    if (instance) {
      return instance;
    }

    this.htmlStr = htmlStr;
    this.init();
    return (instance = this);
  };

  _CreateDiv.prototype.init = function () {
    let div = document.createElement('div');
    div.innerHTML = this.htmlStr;
    document.body.appendChild(div);
  };

  return _CreateDiv;
})();

const a = new CreateDiv('111');
const b = new CreateDiv('222');
console.log('--相等', a === b, a, b);

/**
 * 虽然现在完成了一个「透明的」单例类，但它同样有确定。
 * 为了把 instance 封装起来，我们使用了立即执行函数和闭包，
 * 并且让这立即执行函数返回真正的 Singleton 构造方法，这增加了程序的复杂性，阅读起来不是很舒服。
 */

// 观察现在的 Singleton 构造函数
var CreateDiv = function (htmlStr) {
  if (instance) {
    return instance;
  }

  this.htmlStr = htmlStr;
  this.init();
  return (instance = this);
};

/**
 * 在这段代码中，CreateDiv 的构造函数实际上负责了两件事。
 * 第一是创建对象和执行初始化 init 方法，
 * 第二是保证只有一个对象。
 *
 * 虽然没钱还没接触`单一职责原则`的概念，但可以明确的是，这是一种不好的做法，
 * 至少这个构造函数看起来很奇怪。
 *
 */

/**
 * 假设我们某天需要利用这个类，在页面中创建千千万万的 div，即要这个类从单例类变成一个普通的可参数多个实例的类，
 * 那我们必须得重写 CreateDiv 构造函数，把控制创建唯一对象的那段逻辑去掉，这种修改会给我们带来不必要的烦恼，
 * 请看下节
 */
