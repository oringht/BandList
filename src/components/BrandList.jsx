import React from "react";
export default class BrandList extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: []
    };
  }
  //组件要挂载
  componentWillMount() {
    this.getListData();
  }
  render() {
    return (
      <div>
        <h1>品牌列表</h1>
        <input type="text" ref="username" />
        <input type="button" value="增加" onClick={() => this.listAdd()} />
        {this.state.listData.map(item => (
          <div key={item.id}>
            {item.name}.........{this.timeFilter(item.ctime)}.....
            <input
              type="button"
              value="删除"
              onClick={() => this.listDel(item.id)}
            />
          </div>
        ))}
      </div>
    );
  }
  getListData = async () => {
    let { data } = await this.http.get("/api/getprodlist");
    //console.log(data);
    this.setState({
      listData: data.message
    });
  };
  listDel = async id => {
    let res = await this.http.get("/api/delproduct/" + id);
    //this.getListData()
    if (res.data.status === 0) {
      this.getListData();
    }
  };
  listAdd = async () => {
    let res = await this.http.post("/api/addproduct", {
      name: this.refs.username.value
    });
    //console.log(res);
    if (res.data.status === 0) {
      this.getListData();
      this.refs.username.value = "";
    }
  };
  timeFilter = data => {
    let date = new Date(data);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return `${y}-${m}-${d} qqqqqqqqq`;
  };
}
