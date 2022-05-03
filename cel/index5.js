/**================================== 一个字段，多个校验 **/

/********* 策略对象 *********/
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

/********* Validator 类 *********/
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

/********* 客户端代码 *********/
function validatorLoginHandler() {
  const validator = new Validator();
  validator.add(loginForm.userName);
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
