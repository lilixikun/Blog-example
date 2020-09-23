(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // module.exports = {};
    //构建一个新的模块化规范 并 将moduleId放入缓存
    var module = (installedModules[moduleId] = {
      exports: {},
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    return module.exports;
  }
  return __webpack_require__('/Users/xikun/Documents/xikun/git/Blog-example/packages/webpack/src/index.js');
})({
  '/Users/xikun/Documents/xikun/git/Blog-example/packages/webpack/src/index.js': function (module, exports, require) {
    "use strict";

    var _data = _interopRequireDefault(require("./data.js"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    console.log(_data["default"]);
    console.log('我是主入口 init');
  }, './data.js': function (module, exports, require) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var data = '我是data';
    var _default = data;
    exports["default"] = _default;
  },
})