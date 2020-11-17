// 手写JS数组扁平化(flat)方法

// 方法一 递归处理
let result = [];
function flat(arr) {
    for (let i = 0; i < arr.length; i++) {
        let item = ary[i];
        if (Array.isArray(item)) {
            flat(item)
        } else {
            result.push(item)
        }
    }
}

// 利用 reduce
function flatten(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}

// 利用扩展运算符
let ary = [1, 2, [3, 4], [5, [6, 7]]]
while (ary.some(Array.isArray)) {
    ary = [].concat(...ary);
}
console.log(flatten(ary))