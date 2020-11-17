// filter 接收一个函数 返回符合要求组成的一个新数组
Array.prototype.filter = function (callback) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            res.push(this[i])
        }
    }
    return res
}

const a = [1, 2, 3, 4, 5, 3, 4];

let b = a.filter((item) => item > 2)
console.log(b);
console.log(a);