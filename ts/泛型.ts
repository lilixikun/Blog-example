// 我们在不知道传入参数的时候,可以使用 泛型

function say<T>(t: T): T {
    console.log(t);
    return t
}

say(1)
say('str')

// 泛型约束

interface Item {
    name: string
}

class DataManager<T extends number | string>{
    constructor(private data: T[]) { }
    getItem(index: number): T {
        return this.data[index]
    }
}
// const data = new DataManager<number>([1]);
// data.getItem(0)
const data = new DataManager(['xikun'])

// 如何使用泛型作为一个具体的类型注解
function hello<T>(params: T) {
    return params
}
const func: <T>(param: T) => T = hello

// keyof 用法
interface Person {
    name: string;
    age1: number;
    gender: string
}

class Teacher {
    constructor(private info: Person) { }
    getInfo<T extends keyof Person>(key: T): Person[T] {
        return this.info[key]
    }
}

const teacher = new Teacher({
    name: 'xikun',
    age1: 22,
    gender: 'mad'
})

const test = teacher.getInfo('gender')
console.log(test);
