// 手写一个克隆

// 乞丐版
const obj = {
    test: {
        a: 2
    },
    arr: function () { }
};
const obj2 = JSON.parse(JSON.stringify(obj));

// const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj.arr);
console.log(obj2.arr);

// 基础版本1
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key]
    }
    return cloneTarget
}

// 基础版本2 对象的引用
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}

// 基础版本3 考虑数组
function clone(target) {
    if (typeof target === "object") {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

// 解决循环引用
// 解决循环引用问题，我们可以额外开辟一个存储空间，
// 来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，
// 先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
// 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题

function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target
    }
}

// 优化去掉 for in 和使用弱引用
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function clone(target, map = new WeakMap()) {
    if (typeof target === "object") {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};

        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = clone(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
}