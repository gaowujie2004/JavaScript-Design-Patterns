/**================================== 实现单例 **/
var Singleton = function (name) {
  this.name = name;
};

Singleton.instance = null;
Singleton.prototype.getName = function () {
  return this.name;
};

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const a = Singleton.getInstance('Gwj111');
const b = Singleton.getInstance('Gwj222');

console.log(a === b);

/**================================== 第二种实现 **/
var Singleton = function (name) {
  this.name = name;
};

Singleton.prototype.getName = function () {
  return this.name;
};

Singleton.getInstance = (() => {
  // 把 instance 放到了内部，形成了私有变量
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }

    return instance;
  };
})();

/**
 * 我们通过 Singleton.getInstance 来获取 Singleton 类的唯一实例，这种方式相对简单，
 * 但有一个问题，就是增加了这个类的`不透明性`。
 *
 * Singleton 类的使用者必须知道这个类是单例类，跟以往通过 new XXX 的方式来获取对象不同，
 * 这里偏要使用 Singleton.getInstance 来获取对象。
 * 虽然完成单例类的编写，但上面的代码意义并不大，接下来一步一步写出更好的单例模式。
 */
