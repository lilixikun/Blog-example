Function.prototype.MyInstanceOf = function (L, R) {
    let proto = L.__proto__
    let prototype = R.prototype
    while (true) {
        if (proto === null) {
            return false
        }
        if (proto === prototype) {
            return true
        }
        proto = proto.__proto__
    }
}