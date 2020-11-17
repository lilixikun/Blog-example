// map 函数接收一个函数,然后一个新的数组
Array.prototype.map = function (callback) {
    const resArr = [];
    let index = 0
    while (index < this.length) {
        resArr.push(callback(this[index], index, this))
        index++
    }
    return resArr
}