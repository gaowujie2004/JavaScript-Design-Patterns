/**
 * todo: JavaScript 中的单例模式
 * 前面提到的几个单例模式的实现，更多的是接近传统面向对象语言中的实现，单例对象从“类”中创建而来。
 * 在以类为中心的语言中，这是很自然的做法。比如在 Java 中，如果需要某个对象，就必须先定义一个类，对象总是从类中创建而来的。
 *
 * 但 JavaScript 是一们无类语言，也正因如此，生搬单例模式的概念是无意义的。在 JavaScript 中创建对象的方法非常简单，既然需要一个「唯一」的对象，
 * 为什么要先创建一个“类”呢？这无异于穿棉衣洗澡，传统的单例模式实现在 JavaScript 中并不适用。
 *
 * 什么是单例模式？『确保只有一个实例，并提供全局访问』
 */
