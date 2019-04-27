const path = require("path");
//导入在内存中自动生成 index 页面的插件
const HtmlWebpackplugin = require("html-webpack-plugin");

//创建一个插件的实例对象
const htmlplugin = new HtmlWebpackplugin({
  template: path.join(__dirname, "./src/index.html"), //源文件
  filename: "index.html" //生成的内存中首页的名称
});
//向外暴露一个打包的配置对象 因为webpack是基于Node构建的 所以webpack 支持所有Node API
//webpack 默认只能打包处理 .js后缀名类型的文件
module.exports = {
  mode: "production", //production(压缩文件main.js)  development（没有压缩的文件main.js）
  //在webpack4.x 中，有一个很大的特性，就是约定大于配置 约定，默认的打包入口路径是src->index.js

  plugins: [
    new HtmlWebpackplugin({
      template: path.join(__dirname, "./src/index.html") //源文件
    })
  ],

  /* plugins:[
   new HtmlWebpackplugin({
      template: path.join(__dirname, "./src/index.html"), //源文件
      filename: "index.html" //生成的内存中首页的名称
  });
  ] */

  //所有第三方模块的配置规则
  module: {
    //第三方匹配规则 千万别忘记 exclude
    rules: [
      { test: /\.js|jsx$/, use: "babel-loader", exclude: /node_module/ },
      //打包处理css样式表的第三方loader   modules模块化
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]"
        ]
      },
      { test: /\.ttf|woff|woff2|eot|svg$/, use: "url-loader" }, // 打包处理 字体文件 的loader
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    //省略.jsx后缀名
    extensions: [".js", ".jsx", ".json", "vue"],
    alias: {
      //@表示项目根目录中src的这一层目录
      "@": path.join(__dirname, "./src")
    }
  }
};
