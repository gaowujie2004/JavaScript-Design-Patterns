/**================================== 计算奖金 **/

/**================================== 1. 最初的代码 **/

function calculateBonus(performanceLevel, salary) {
  // performanceLevel 绩效等级
  // salary 基本工资

  if (performanceLevel === 'S') {
    return salary * 4;
  }

  if (performanceLevel === 'A') {
    return salary * 3;
  }

  if (performanceLevel === 'B') {
    return salary * 2;
  }
}

calculateBonus('S', 5400);
calculateBonus('S', 7000);

/**
 * 十分简单，省事省力的代码，但存在显而易见的缺点：
 * 1、calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑分支。
 * 2、calculateBonus 函数缺乏弹性，如果新增了一种新的绩效等级 C，或者想把绩效 S 的奖金系数改为 5，那我们必须深入
 * calculateBonus 函数内部的实现，这是违反了「开发-封闭」原则的。
 * 3、算法的复用性差，如果在程序的其他地方需要重用这些计算将近的算法呢？只能复制粘贴了，或者提到函数中
 * 所以，需要重构他。
 */

/**================================== 2. 使用组合函数重构代码 **/
// 一般容易想到的就是使用 组合难受 来重构代码，我们把各种算法封装到一个一个小函数中，这些小函数有**良好的命名**
// 可以一目了然地知道它对应的处理逻辑（算法），他们也可以被复用在程序的其他地方。
// 自己的想法：一开始没必要这样做，等需要被复用的时候再这样做。
// 或者算法非常简单也封装成小函数

function performanceS(salary) {
  return salary * 4;
}
function performanceA(salary) {
  return salary * 3;
}
function performanceB(salary) {
  return salary * 2;
}

function calculateBonus(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return performanceS(salary);
  }
  if (performanceLevel === 'A') {
    return performanceA(salary);
  }
  if (performanceLevel === 'B') {
    return performanceB(salary);
  }
}

// 目前 calculateBonus 先到得到了改善，但这种改善非常有限，依然没有解决最重要的问题：calculateBonus 函数有可能越来约大
// 而且在系统变化的时候缺乏弹性。

/**================================== 3. 使用策略模式重构代码 **/

/**
 * 策略模式：定义一系列的算法，把他们一个个封装起来。将`不变的`部分和`变化的`部分隔开是每个设计模式的主题，策略模式也不例外，其目的就是将
 * `算法的使用`和`算法的实现`分离开来。
 *
 * 在这个例子中，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金金额，然后再返回金额。而算法的实现是各异和变化的，
 * 每种绩效对应着不同的计算规则
 *
 * 策略模式至少需要：1）一组策略类，其封装了具体的算法，并负责具体的计算过程。2）环境类 Context，其接收客户的请求，
 * 随后把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用。
 */

// 现在使用策略模式重构上面的代码，第一个版本是传统面向对象语言中的实现，代码如下所示：

// 先把每种计算绩效的规则都封装在对应的策略类里面：
class PerformanceS {
  calculate(salary) {
    return salary * 4;
  }
}
class PerformanceA {
  calculate(salary) {
    return salary * 3;
  }
}
class PerformanceB {
  calculate(salary) {
    return salary * 2;
  }
}

// 接下来订阅奖金类 Bonus：
class Bonus {
  constructor() {
    this.salary = null; // 基本工资
    this.strategy = null; // 绩效等级对应的策略对象
  }

  setSalary(salary) {
    this.salary = salary;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  getBonus() {
    if (!this.strategy) {
      throw new Error('必须设置 策略类 对象');
    }
    this.strategy.calculate(this.salary);
  }
}

/**
 * 在完全之前，回顾一下策略模式：：定义一系列的算法，把他们一个个封装起来。
 * 详细：定义一系列算法，把他们各自封装成 策略类，算法被封装在策略类内部的方法里，在客户对 Context 发起请求的时候，
 * Context 总是把请求委托给这些策略类对象中间的某一个进行计算。
 *
 * 现在来完成剩余代码。先创建一个 bonus 对象，并且给 bonus 对象设置一些原始的数据，比如员工的基本工资。
 * 接下来把某个计算奖金的策略对象也传入 bonus 对象内部保存起来。当调用 bonus.getBonus() 计算奖金时，
 * bonus 对象本身没有能力计算，而是把请求委托给了之前保存好的 策略对象：
 */
const xiaoHongBonus = new Bonus();
xiaoHongBonus.setSalary(5000);
xiaoHongBonus.setStrategy(new PerformanceS()); // 设置策略对象
console.log('小红的奖金', xiaoHongBonus);

const xiaoMingBonus = new Bonus();
xiaoMingBonus.setSalary(5000);
xiaoMingBonus.setStrategy(new PerformanceB()); // 设置策略对象
console.log('小明的奖金', xiaoMingBonus);

/**
 * 可以看到通过策略模式重构之后，代码变得清晰，`但同时复杂度提升了`，每个类的职责清晰了，但这段代码是基于传统面向对象语言的模仿。
 */
