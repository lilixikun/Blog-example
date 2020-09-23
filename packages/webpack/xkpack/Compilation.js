const { join } = require('path');
const Parser = require('./Parser');
const Template = require('./Template.js');

class Compilation {

    constructor(compiler) {
        const { options, modules } = compiler
        this.options = options
        this.modules = modules
    }

    buildModule(fileName, isEntry) {
        let ast = ''
        if (!isEntry) {
            const path = join(process.cwd(), './src/', fileName);
            ast = Parser.ast(path)
        } else {
            ast = Parser.ast(fileName)
        }

        const dependencies = Parser.getDependency(ast);
        const code = Parser.transform(ast)
        return {
            fileName,
            dependencies,
            code
        }
    }

    emitFiles() {
        let _modules = '';
        this.modules.map(_module => {
            _modules += ` '${_module.fileName}': function (module, exports, require) {
                ${_module.code}
              },`;
        })
        const template = new Template(_modules, this.options)
        template.write()
    }
}

module.exports = Compilation