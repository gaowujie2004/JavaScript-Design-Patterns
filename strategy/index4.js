/**================================== 表单校验 **/

// 校验规则：1）userName 不能空；2）密码长度不能少于6位；3）手机号符合格式

// 第一版

// 第二版，策略模式重构

// 把表单校验逻辑封装成策略对象：
const strategies = {
  isNotEmpty(val, errMsg) {
    if (val.trim() === '') {
      return errMsg;
    }
  },
  minLength(val, length, errMsg) {
    if (val.trim().length < length) {
      return errMsg;
    }
  },
  isMobile(val, errMsg) {
    if (val.length < 11 || !/1\d{10}/.test(val)) {
      return errMsg;
    }
  },
};

/**
 * 接下来实现 Validator 类，此类在这里作为 Context，负责接收用户的请求并委托给 策略对象。在给出 Validator 类代码之前，
 * 有必要提前了解用户是如何向 Validator 类发送请求的。这样有助于我们知道如何编写 Validator 类的代码：
 */

function validatorLoginHandler() {
  const validator = new Validator();
  validator.add(loginForm.userName, 'isNotEmpty', '用户不能为空');
  validator.add(loginForm.passWord, 'minLength:6', '密码不能小于6位');
  validator.add(loginForm.userName, 'isMobile', '手机号码不正确');

  return validator.start(); // 获取校验结果
}

$('button').onclick = () => {
  var errMsg = validatorLoginHandler();
  if (errMsg) {
    alert(errMsg);
    return false;
  }
};

/**
 * 从上面的代码可以看到，创建了 validator 对象，然后通过 validator.add 方法，往 validator 对象中添加一些校验规则。
 * validator.add 接收3个参数，以下面这句代码说明：
 *    validator.add( loginForm.password, 'minLength:6', '密码长度最少6位 );
 * loginForm.password 密码值，
 * minLength:6，minLength 表示选中那个策略对象,
 * 开始实现， validator 类
 */
class Validator {
  constructor() {
    this.cache = []; // 保存校验规则
  }

  add(val, rule, errMsg) {
    const [strategy, length] = rule.split(':');
    this.cache.push(() => {
      return strategies[strategy](val, length, errMsg);
    });
  }

  start() {
    for (const fn of this.cache) {
      if (fn() !== undefined) {
        return;
      }
    }
  }
}

/**================================== 完整的 **/

/**
 * 使用策略模式重构之后，我们仅仅通过「配置」的方式就可以完成一个表单的校验，这些校验规则也可以复用在程序的任何地方，
 * 还能作为插件的形式，方便地被移植到其他项目中。
 *
 * 在修改某个校验规则代码之后，只需要编写或改写少量的代码。比如我们想将 用户名输入框的校验规则改成
 * 用户名不能少于 10 个字符，可以看到，这时候的修改不费吹灰之力
 *
 *  validator.add(loginForm.userName, 'isNotEmpty', '用户不能为空');
 *
 *  改成👇🏻
 *  validator.add(loginForm.userName, 'minLength:10', '用户不能为空');
 */
