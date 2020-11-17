Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== "function") {
        throw new Error('typeError')
    }
    const fn = Symbol("fn")
    thisArg = thisArg || window;
    // 改变指向
    thisArg[fn] = this
    // 执行函数
    const res = thisArg[fn](...args)
    // 执行完删除
    delete thisArg[fn]
    return res
}

const obj = {
    value: 'mycall'
}

const fn1 = function (x, y, z) {
    console.log(this.value, x, y, z);
}

fn1.myCall(obj, 1, 2, 3)