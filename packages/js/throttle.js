
/**
 * 函数截流  在一定时间内只执行一次
 * @param {*} fn 
 * @param {*} wait 
 */
function throttle(fn, wait) {
    let prev = Date.now()
    return function () {
        const now = Date.now();
        if (now - prev > wait) {
            fn.apply(this, arguments)
            prev = Date.now()
        }
    }
}