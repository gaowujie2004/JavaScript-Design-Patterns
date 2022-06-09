/**================================== 用代理实现单例模式 **/

var CreateDiv = function (html) {
  this.htmlStr = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  let div = document.createElement('div');
  div.innerHTML = this.htmlStr;
  document.body.appendChild(div);
};

// 接下来引入代理类 ProxySingletonCreateDiv;
var ProxySingletonCreateDiv = (() => {
  // 私有变量
  let instance = null;

  return function (html) {
    if (!instance) {
      return (instance = new CreateDiv(html));
    }

    return instance;
  };
})();
let a = new ProxySingletonCreateDiv('GaoWuJie');
let b = new ProxySingletonCreateDiv('QinBeiLei');
console.log('--相等', a === b, a, b);

/**================================== 动态代理 **/
var ProxySingletonCustom = function (ConstructionFn) {
  // 私有变量
  let instance = null;

  return function (html) {
    if (!instance) {
      return (instance = new ConstructionFn(html));
    }

    return instance;
  };
};

var SingletonCreateDiv = ProxySingletonCustom(CreateDiv);

var c = new SingletonCreateDiv('孩子啊');
var d = new SingletonCreateDiv('孩子啊');
console.log('--相等', c === d, c, d);

/**
 * 通过引入代理类的方式，我们同样完成了一个单例模式的编写，跟之前不同的是，现在我们把负责管理单例的逻辑移到了
 * 代理类 ProxySingletonCreateDiv 中。这样一来，CreateDiv 就变成了普通类，跟他的 SingletonCreateDiv 组合起来
 * 可以达到单例模式的效果。
 *
 * 本例是`缓存代理`的应用之一
 */
