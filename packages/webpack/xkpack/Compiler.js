const { SyncHook } = require('tapable');
const Compilation = require('./Compilation.js')

class Compiler {
    constructor(options) {
        this.hooks = {
            run: new SyncHook(['compilation']),
        };
        this.modules = [];
        this.options = options
    }
    run() {
        const onCompiled = (err, compilation) => { }
        this.compile(onCompiled);
    }

    compile() {
        const compilation = this.newCompilation();
        this.hooks.run.call(compilation);
        // 得到入口文件

        const entryMoudle = compilation.buildModule(this.options.entry, true)
        this.modules.push(entryMoudle)

        this.modules.map(_module => {
            _module.dependencies.map(dependency => {
                this.modules.push(compilation.buildModule(dependency, false))
            })
        })
        compilation.emitFiles()
    }

    newCompilation() {
        const compilation = new Compilation(this);
        // this.hooks.compilation.call(compilation, params);
        return compilation;
    }
}

module.exports = Compiler