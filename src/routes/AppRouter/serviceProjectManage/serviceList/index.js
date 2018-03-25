import React, {Component} from 'react'
// import {BrowserRouter as Router,Link} from 'react-router-dom'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import {Table, Icon, Divider} from 'antd';
import {Link} from 'dva/router'

class ServiceList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const searchContent = ['正在报名', '正在进行', '已结束', '发布人'];

    return (
      <div>
        <Choose/>
        <Search searchContent={searchContent}/>
        <div className="show">

          <Table columns={columns} dataSource={data}/>
        </div>
      </div>

    )
  }
}


const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num'
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  },
  {
    title: '发布人',
    dataIndex: 'writer',
    key: 'writer',
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '活动状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title:'人数',
    dataIndex:'people',
    key:'people'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
      {/*<a href="#">{record.name}</a>*/}
        {/*<Divider type="vertical" />*/}
        <Link to="/activity/1" className="ant-dropdown-link">
        详情 <Icon type="down"/>
      </Link>
    </span>
    ),
  }];

const data = [{
  key: '1',
  name: '敬老爱老',
  writer: 'cxy',
  time: '2015年3月21日',
  num: 1,
  people:'10/20',
  state: '正在报名',
}, {
  key: '2',
  name: '乘客疏导',
  writer: 'dyx',
  time: '2015年3月21日',
  num: 2,
  people:'13/20',
  state: '正在报名',
}, {
  key: '3',
  name: '清扫楼道',
  writer: 'ccc',
  time: '2015年3月21日',
  num: 3,
  people:'20/20',
  state: '已结束'
}];

export default ServiceList
