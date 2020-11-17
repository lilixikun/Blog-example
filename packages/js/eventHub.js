// 实现发布订阅

class EventEmitter {
    constructor() {
        this.events = {};
    }

    // 支持一个名字订阅多个事件函数
    on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = [fn]
        } else {
            this.events[name].push(fn)
        }
    }
    // 触发事件
    emit(name) {
        if (this.events[name]) {
            this.events[name].forEach(cb => cb())
        }
    }
    // 移除某个名字下订阅的函数
    removeListener(name, fn) {
        if (this.events[name]) {
            this.events[name] = this.events[name].filter(cb => cb != fn)
        }
    }
    // 只执行一次订阅的事件，然后移除
    once(name, callback) {
        // 绑定的是fn, 执行的时候会触发fn函数
        let fn = () => {
            callback(); // fn函数中调用原有的callback
            this.removeListener(name, fn); // 删除fn, 再次执行的时候之后执行一次
        }
        this.on(name, fn)
    }
}

let em = new EventEmitter();
let workday = 0;
em.on("work", function () {
    workday++;
    console.log("work everyday");
});

em.once("love", function () {
    console.log("just love you");
});

function makeMoney() {
    console.log("make one million money");
}
em.on("money", makeMoney);

let time = setInterval(() => {
    em.emit("work");
    em.removeListener("money", makeMoney);
    em.emit("money");
    em.emit("love");
    if (workday === 5) {
        console.log("have a rest")
        clearInterval(time);
    }
}, 1);