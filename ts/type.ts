// const bool: boolean = false

// const num: number = 10

// const str: string = "xikun"

// let v: void;
// function alertName(name: string): void {
//     alert(name)
// }

// const n: null = null;
// const u: undefined = undefined

// // undefined 和 null 是所有类型的子类型
// const num1: number = u
// const num2: number = n

// // any 类型 可以改变值的类型
// let a: any = 7
// a = "change"

// // 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
// let something //等价于 let something:any

// // 联合类型
// let myFavoriteNumber: string | number = 2
// myFavoriteNumber = 'lili'


// // interface
// // interface Person {
// //     name: string;
// //     age: number;
// //     sex?: number; //可选属性
// // }

// interface Person {
//     readonly name: string;
//     age: number;
//     [propName: string]: string | number; // 任意属性时不能有可选属性,都是它的子集
// }

// let tom: Person = {
//     name: 'tom',
//     age: 20,
//     sex: 1
// }

// // readonly 只读属性时不能修改
// // tom.name = 'xx'


// // 数组定义
// let arr: Array<number> = [1, 2, 3]
// let arr1: number[] = [2, 3, 4]
// // 数组中不能出现别的类型
// // let arr1: number[] = [2, 3, 4,'str']

// // 使用联合类型定义
// let arr2: Array<number | string> = [1, 2, 3, "str"]
// let arr3: (number | string)[] = [1, 2, 3, "str"]

// // 元祖
// let tom1: [string, number] = ['Tom', 25];
// const teacherList: [string, string, number][] = [['dell', 'male', 19], ['sun', 'female', 26], ['jeny', 'female', 38]];

// // 可选参数
// function buildName(firstName: string, lastName?: string) {

// }
// // 剩余参数
// function buildName1(firstName: string, ...items: any[]) {

// }

// // 函数重载
// function add(arg1: string, arg2: number): void
// function add(arg1: number, arg2: number): void

// function add(arg1: string | number, arg2: number): void {

// }

// // 类型断言 as
// interface Cat {
//     name: string;
//     run(): void;
// }
// interface Fish {
//     name: string;
//     swim(): void;
// }
// // 能干欺骗编译器通过 不是很安全
// function swim(animal: Cat | Fish) {
//     (animal as Fish).swim();
// }

// // 类型保护  
// function trainAnialSecond(animal: Cat | Fish) {
//     // 使用 in 语法
//     if ("run" in animal) {
//         animal.run()
//     } else {
//         animal.swim()
//     }
// }


// // 类型别名
// type User = { name: string; age: number };
// const user: User = {
//     name: 'xikun',
//     age: 23
// }


// 枚举
enum Status {
    SUCCESS,
    FAILD
}
console.log(Status.SUCCESS, Status[1]);
