/**================================== JavaScript 策略模式 **/

/**
 * 在 JavaScript 中，函数也是对象，所以更简单和直接的做法是把 strategy 直接定义为函数：
 */

const strategies = {
  ['S'](salary) {
    return salary * 4;
  },
  ['A'](salary) {
    return salary * 3;
  },
  ['B'](salary) {
    return salary * 2;
  },
};

// 同样，Context 也没必要必须用 Bonus 类表示，我们依然用 calculateBonus 函数充当 Context 来接收用户的请求。
// 讲过改造，代码结构变得更加简洁：
function calculateBonus(level, salary) {
  return strategies[level](salary);
}
