// 接受的参数是一个数组
Function.prototype.myApply = function (thisArg, args) {
    thisArg = thisArg || window
    const fn = Symbol("fn")
    thisArg[fn] = this
    const res = thisArg[fn](args)
    delete thisArg[fn]
    return res
}


const obj = {
    value: 'mycall'
}

const fn = function (arr) {
    console.log(arr);
    console.log(this.value, arr.toString());
}

fn.myApply(obj, [1, 2, 3])