/**
 * todo: 惰性单例模式
 */

var createLoginLayer = (() => {
  let div = null;

  return () => {
    if (div) {
      return div;
    }

    div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
  };
})();

$('.loginBtn').onclick = () => {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};
