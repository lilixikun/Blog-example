const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log(' 🔥🔥🔥 webpack 构建过程开始！');
            //console.log('🔥', compilation);
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;
