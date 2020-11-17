// 使用setTimeout模拟setInterval

setTimeout(function () {
    // do something
    setTimeout(arguments.callee, 500);
}, 500);