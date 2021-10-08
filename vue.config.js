const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const devServer = {
  port: "8080",
  disableHostCheck: true,
  open: true,
  proxy: {
    // detail: https://cli.vuejs.org/config/#devserver-proxy
    [process.env.VUE_APP_BASE_API]: {
      // target: `http://127.0.0.1:${port}`,
      // target: "http://114.96.104.203:9000",
      target: "http://114.96.104.203:9000",
      changeOrigin: true,
      pathRewrite: {
        ["^" + process.env.VUE_APP_BASE_API]: "",
      },
    },
  },
};
module.exports = {
  publicPath: "./",
  lintOnSave: true,
  devServer,
  outputDir: "./dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
  filenameHashing: true,
  //   output: {
  //     filename: "[name].[hash].Nebula.js",
  //   },
  configureWebpack: (config) => {
    //   // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
    //   // chunkFilename: `js/[name].${conf.version}.js`
    // };
    config.output.filename = `js/[name].${
      "Nebula" + parseInt(Math.random() * 1000)
    }.js`;
    config.output.chunkFilename = `js/[name].${
      "Nebula" + parseInt(Math.random() * 1000)
    }.js`;

    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs =
        ["console.log"];
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true,
        })
      );
    }
    config.resolve.alias
      .set("assets", resolve("./src/assets"))
      .set("views", resolve("./src/views"))
      .set("store", resolve("./src/store"))
      .set("utils", resolve("./src/utils"));
    config.output.filename("[name].[hash].js").end();
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')
    // 移除 preload 插件
    // config.plugins.delete('preload');
  },
};
