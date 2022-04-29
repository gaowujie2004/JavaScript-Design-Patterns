/**
 * todo: 通用的惰性单例
 * 上一节我们完成了一个惰性单例，但存在一些问题：
 * 1、任然违反了「职责单一原则」，创建对象 和 管理单例的逻辑都放在了 createLoginLayer 内部
 * 2、如果要创建其他的 DOM，比如 span 等，我们又要重写一遍，不具有复用性
 */

var createIframe = (() => {
  let div = null;

  return () => {
    if (div) {
      return div;
    }

    div = document.createElement('iframe');
    div.innerHTML = 'xxxx';
    div.style.display = 'none';
    document.body.appendChild(div);
  };
})();

/**
 * 我们把不变的部分隔离出来，
 */

/**================================== 开始实现 **/
var getSingle = (fn) => {
  let result;

  return function (...args) {
    // todo: this
    return result || (result = fn.apply(this, args));
  };
};

/**================================== 使用 createLoginLayer **/
var createLoginLayer = function () {
  var div = document.createElement('div');
  div.innerHTML = '我是登录窗口';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

// 多次点击，只产生一个。
$('.loginBtn').onclick = () => {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};

/**================================== 使用 createIframe **/
var createSingleIframe = getSingle(() => {
  let iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  return iframe;
});

$('.loginBtn').onclick = () => {
  var loginLayer = createSingleIframe();
  loginLayer.src = 'xxxxx';
};

/**
 * 在上面两个例子中，我们把创建`对象的职责`和`管理单例`的职责分别放置在两个方法里，
 * getSingle 函数是管理单例的函数；createLoginLayer 是创建对象的具体业务代码。
 * 这两个方法可以独立变化而互不影响，当他们连接在一起的时候，姐完成创建唯一实例对象的功能，看起来是一件挺奇妙的事情。
 *
 * 这种单例模式的用途不止创建对象，比如我们通常渲染完页面中的一个列表之后，接下来要给这个列表绑定 click ，
 * 如果是通过 ajax 动态列表里追加数据，在使用事件代理的嵌套下，click 事件实际上只需要在第一次渲染列表的时候被绑定一次，
 * 但我们不行去判断当前是否是第一次渲染列表
 */
// 借助 Jq，绑定 one 事件
var bindEvent = function () {
  $('div').one('click', () => {
    // 只绑定一次
    alert('click!');
  });
};

var render = function () {
  console.log('渲染列表');
  bindEvent();
};

render();
render();
render();

// 借助 getSingle 单例模式
var singleBindEvent = getSingle(() => {
  console.log('--执行');

  document.addEventListener('click', () => {
    console.log('点击了');
  });

  // 注意这里
  return true;
});

var render = () => {
  console.log('--开始渲染');
  singleBindEvent();
};

render();
render();
render();
