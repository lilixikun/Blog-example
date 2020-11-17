// // interface 和 type 想类似,但并不完全一致
// interface Person {
//     name: string;
//     // 可选参数
//     age?: number;
//     // 任意参数
//     [propName: string]: any;
//     say(): string;
// }

// interface Teacher extends Person {
//     teach(): string;
// }

// const getPersonName = (person: Person): void => {
//     console.log(person.name);
// }

// const setPersonName = (person: Teacher, name: string): void => {
//     person.name = name
// }

// const person: Teacher = {
//     name: 'xk',
//     age: 20,
//     sex: 1,
//     say() {
//         return 'say hello'
//     },
//     teach() {
//         return 'teach'
//     }
// }

// getPersonName(person)
// setPersonName(person, 'lili')
// getPersonName(person)

// // 接口实现
// class User implements Person {
//     name = 'xikun'
//     say() {
//         console.log(this.name);
//         return this.name
//     }
// }
// const user = new User()
// user.say()

// interface SayHi {
//     (word: string): string
// }

// const say: SayHi = (word: string) => {
//     console.log(word);

//     return word
// }

// say('word')
