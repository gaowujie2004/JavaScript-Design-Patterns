# 发布-订阅模式

又叫观察者模式，它定义对象间的一种`一对多`的依赖关系，当一个对象的状态发生改变时，所以依赖于它的对象都会得到通知。在 JavaScript 中，一般用事件模型
来代替传统的发布-订阅模式

## 现实中的发布-订阅模式

购房者和销售就是一对多，销售负责的这个房子有动静了，就去查查联系人，然后一个一个的去通知哪些订阅的人，给他们发送通知。
这样做的好处：

- 1. 购房者不用天天给售楼处打电话咨询开售时间，在合适的时间点，售楼处作为发布者会通知这些消息订阅者。

- 2. 购房者和售楼处不再强耦合，有新的`购房者`（订阅者）出现时，他只需要把手机号码留在`售楼处`（发布者），售楼处不关心购房者的任何情况，不管购房者是男是女还是一只猴子。
     而售楼处的任何变动也不会影响购买者，比如售楼 MM 离职、售楼处从一楼搬到二楼，这些改变都跟购房者无关，只要售楼处记得发短信通知购买者就行了。

回到编程中：
第一点说明发布-定义模式可以广泛应用于异步事件中。

第二点说明发布-订阅模式可以取代对象之间硬编码的通知机制，一个对象不再显式地调用另一个对象的某个接口。发布-订阅模式让两个对象松耦合地联系在一起，虽然
不太清楚彼此的细节，但这不影响他们之间相互通信。当新的订阅者出现时，发布者的代码不需要任何修改；同样发布者需要改变时，也不会影响之前的订阅者。只要
之前约定的事件名没有变化，就可以自由的改变他们。

# DOM 事件

document.addEventListener('click', () => {})
document.addEventListener('click', () => {})
document.addEventListener('click', () => {})

向 click 这个售楼处，添加了 3 个订阅者。

# 自定义事件

现在来看看如何一步一步实现发布-订阅模式。
1、首先要指定好谁充当`发布者`（售楼处）
2、然后给发布者添加一个缓存列表，用于存放会回调函数以便通知`订阅者`（售楼处的花名册）
3、最后发布消息的时候，`发布者`会遍历这个缓存列表，依次触发里面存放的`订阅者`回调函数（遍历花名册，挨个发消息）

另外，还可以往回调函数里传入参数，订阅者回调函数可以接收这些参数。这是很有必要的，比如`售楼处`可以在给订阅者的短信里加上房子的单价、面积、容积率等信息，
订阅者接收到这些信息之后可以进行各自的处理

# 取消订阅

有时候，我们也许需要取消订阅事件的功能。比如 A 同学突然对这个房子不感兴趣了，为了避免继续接收到售楼处关于这个房子的信息，A 同学需要取消之前订阅的事件。

# JavaScript 实现发布-订阅模式的便利性

我们一直讨论的发布-订阅模式，跟一些别的语言（比如 Java）中的实现不太一样。在 Java 中实现一个直接的发布-订阅模式，通常会把订阅者对象自身当成
引用传入发布者对象中，同事订阅者对象还需要提供一个诸如 update 的方法，供发布者对象在合适的时候调用。而在 JavaScript 中，我们用注册回调函数的形式来代替
传统的发布-订阅模式，显得更优雅和简单。

另外，在 JavaScript 中，我们无需去选择使用推模型还是拉模型。推模型是指在事件发生时，发布者一次性把所有更改的状态和数据都推送给订阅者。
拉模型不同的地方是，发布者仅仅通知订阅者事件已经发送了，此外发布者要提供一些公共的接口供订阅者来主动拉取数据。拉模型的好吃是可以让订阅者“按需获取”，
但是同时有可能让发布者变成一个“门户大开”的对象，同时增加了代码量和复杂度。

刚好在 JavaScript 中， arguments 可以很方便地表示参数列表，所以我们一般都会选择推模型，使用 Function.prototype.apply 方法把所有的参数都推给订阅者。

# 小结

发布-订阅模式，即观察者模式，此模式在实际开发中非常有用。

发布-订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常广泛，即可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。
发布-订阅模式还可以用来实现一些别的设计模式，比如`中介者模式`。从架构上来看，无论是 MVC 还是 MVVM，都少不了发布-订阅模式的参与，而且
JavaScript 本身也是一门基于事件驱动的语言。

缺点：

- 创建订阅者本身要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但这个`订阅者`会始终存放在内存中。
- 此模式虽然可以弱化对象之间的联系，但如果过渡使用的话，对象和对象之间的`必要联系`也将被深埋在背后，会导致程序难以跟踪维护和理解。
  特别是多个发布者和订阅者嵌套到一起的时候，要跟踪 BUG 不是轻松的事。

# 最终版

# 参考：

- 博客园 https://www.cnblogs.com/jsydb/p/12545274.html
- 官方源代码：https://blog.yasol.cn/%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F.md
