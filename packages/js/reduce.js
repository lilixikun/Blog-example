// arr.reduce(callback(accumulator, currentValue, currentIndex, array)[，initialValue])
// reducer 函数接收4个参数:

// Accumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)

Array.prototype.reduce = function (callback, initValue) {
    const sourceArray = this
    let index = 0;
    if (!initValue) {
        initValue = sourceArray[0]
        index = 1
    }
    while (index < sourceArray.length) {
        initValue = callback(initValue, sourceArray[index], index, sourceArray)
        index++
    }
    return initValue
}

var a = [1, 2, 3, 4, 5]
a.reduce((acc, cur, index,) => {
    console.log(acc, cur, index)
    return acc + cur
}, 100)