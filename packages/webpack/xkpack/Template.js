const { join } = require('path')
const { writeFileSync, existsSync, mkdirSync } = require('fs')

class Template {
    constructor(modules, options) {
        this.modules = modules
        this.options = options
    }

    write() {
        const { path, filename } = this.options.output
        const outputPath = join(path, filename)

        console.log(path);
        if (!existsSync(outputPath)) {
            mkdirSync(path)
        }

        const template = `(function (modules) {
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
            return __webpack_require__('${this.options.entry}');
          })({
           ${this.modules}
          })`;
        writeFileSync(outputPath, template, 'utf-8');
    }
}

module.exports = Template