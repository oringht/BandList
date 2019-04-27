// 66666//这两个导入的时候，接收的成员名称 必须这么写
import React from "react"; //创建组件 虚拟DOM元素 生命周期
import ReactDOM from "react-dom";
//导入品牌列表组件
import BrandList from "@/components/BrandList";
//导入样式
//import "bootstrap/dist/css/bootstrap.min.css";
//导入axios并配置
import axios from "axios";
//配置baseURL
axios.defaults.baseURL = "http://www.liulongbin.top:3005";
//把axios挂载到组件原型上
React.Component.prototype.http = axios;
let divObj = (
  <div>
    <BrandList />
  </div>
);
ReactDOM.render(divObj, document.getElementById("app"));
