import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import path,{namesMap} from 'routerForm'
import { Table , Input,Menu, Dropdown, Button} from 'antd';
// import { welfare } from '../../../routerForm/app'
import {Link} from 'dva/router'

const {order, welfare} = namesMap
const Search = Input.Search;
const columns = [
  { title: '序号', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '订单号', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '商品名称', dataIndex: 'address', key: '1' },
  { title: '兑换人', dataIndex: 'address', key: '2' },
  { title: '兑换时间', dataIndex: 'address', key: '3' },
  { title: '领取条件', dataIndex: 'address', key: '4' },
  { title: '兑换状态', dataIndex: 'address', key: '5' },
  {
    title: '兑换状态',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">action</a>,
  },
];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 40,
  address: 'London Park',
}];

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">兑换成功</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">未兑换</a>
    </Menu.Item>
  </Menu>
);
@routerPush
@immutableRenderDecorator
export default class ordercon extends PureComponent {



  render () {
    return (
      <div>
        <div className="front-title" style={{height:60}}>
          <div className="index-title"><Link to={path(welfare)}>福利社管理</Link></div>
          <div className="index-title"><Link to={path(order)}>福利社订单管理</Link></div>
        </div>
        <div className="serach-title">
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>兑换成功</Button>
          </Dropdown>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
            onPressEnter
            style={{ width: 200 ,marginLeft:20}}
          />
        </div>

        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </div>
    )
  }
}
