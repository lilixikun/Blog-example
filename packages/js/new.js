// 正常的

function Dog(name) {
    console.log(name);
    this.name = name
}

Dog.prototype.say = function () {
    console.log(this.name);
}

const dog = new Dog('小狗🐶')
dog.say()


// 创建一个空对象
// 链接到原型
// 绑定 this
// 返回新对象
const myNew = function (fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return res instanceof Object ? res : obj
}

const dog1 = myNew(Dog, "自己new出来的🐶")
dog1.say()