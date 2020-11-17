// 手写一个函数柯里化
// 函数柯里化 是固定部分参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。

function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function () {
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    };
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);

// ES6 写法
const curry = (fn, arr = []) => (...args) =>
    (arg => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
        ...arr,
        ...args
    ]);

let curryTest = curry((a, b, c, d) => a + b + c + d);
curryTest(1, 2, 3)(4); //返回10
curryTest(1, 2)(4)(3); //返回10
curryTest(1, 2)(3, 4); //返回10

// 经典写法
Function.prototype.currying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments)
    }
}
Function.prototype.uncurring = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments)
    }
}

