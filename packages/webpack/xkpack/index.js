const options = require('../webpack.config.js')

const plugins = options.plugins || [];
const Compiler = require('./Compiler.js')

const compiler = new Compiler(options)
for (const plugin of plugins) {
    plugin.apply(compiler)
}

compiler.run()