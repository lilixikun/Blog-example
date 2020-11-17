/**
 * 立即执行版本
 * @param {*} fn 
 * @param {*} wait 
 */
function debounce(fn, wait) {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}


/**
 * 调用非立即执行版本  会先执行一次 再进行函数防抖
 * @param {*} fn 
 * @param {*} wait 
 * @param {*} immediate 
 */
function debounce(fn, wait, immediate) {
    let timer;

    return function () {
        let context = this;
        let args = arguments;

        if (timer) clearTimeout(timer);
        if (immediate) {
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) {
                fn.apply(context, args)
            }
        } else {
            timer = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

