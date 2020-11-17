// // private 仅允许在内部使用
// // public 默认都可以使用
// // protected 允许在类内及继承的子类中使用
// class Person {
//     public name = 'xikun';
//     private age = 20;
//     protected sex = "男"
//     getName() {
//         return this.name
//     }
//     getAge() {
//         return this.age
//     }

//     saySex() {
//         console.log(this.sex);
//     }
// }

// class Teacher extends Person {
//     getTeacherName() {
//         return "Teacher"
//     }
//     getName() {
//         return super.getName() + "li"
//     }
//     getAge() {
//         // 私有属性无法在 Teacher 使用 只能在 Person 中使用
//         // return this.age
//         // return super.age
//         return 32
//     }
//     getSex() {
//         console.log(this.sex);
//     }
// }


// // 传统写法
// // public name: string;
// // constructor(name: string) {
// //   this.name = name;
// // }
// class Animal {
//     // 通过 static 定义静态属性
//     public static num: number = 42;
//     static say() {
//         console.log('i am Animal');
//     }

//     // 简化写法
//     constructor(private _name: string) { }

//     // 重写 getter和setter 
//     get name() {
//         return this._name
//     }

//     set name(nama: string) {
//         this._name = nama + "animal"
//     }
// }
// const animal = new Animal('动物')
// console.log(Animal.num);
// Animal.say()
// console.log(animal.name);
// animal.name = 'dog'
// console.log(animal.name);


// // 静态属性和方法都可以被继承
// class Dog extends Animal { }
// console.log(Dog.num);
// Dog.say()
// const dog = new Dog('dog')

// const person = new Person()
// // 无法访问 只允许在类内及继承的子类中使用
// // person.sex

// // person.saySex()
// // const teacher = new Teacher()
// // teacher.getSex()
// // console.log(teacher.getName());
// // console.log(teacher.getAge());
// // teacher.saySex()
// // console.log(teacher.getTeacherName());
