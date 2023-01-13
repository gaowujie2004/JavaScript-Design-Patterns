class Person {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

/**================================== 实现 **/
function createSingleClass<T extends new (...args: any[]) => any>(classFn: T): T {
  let instanceofObject: typeof classFn;

  return class WrapClass {
    constructor(...args: any[]) {
      return instanceofObject || (instanceofObject = new classFn(...args));
    }
  } as T;
}

/**================================== 单例类 **/
const PersonSingle = createSingleClass(Person);

const p1 = new PersonSingle('gwj', 21);
const p2 = new PersonSingle('gw22j', 22);

console.log('p1 === p2 ?', p1 === p2);
