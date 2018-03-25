import { Table, Button, Pagination } from 'antd';

const columns = [{
  title: '角色名称',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '说明',
  className: 'column-money',
  dataIndex: 'money',
}, {
  title: '操作',
  dataIndex: 'address',
}];

const data = [{
  key: '1',
  name: '超级系统管理员',
  money: '￥300,000.00',
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: '普通用户',
  money: '￥1,256,000.00',
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: '部门负责人',
  money: '￥120,000.00',
  address: 'Sidney No. 1 Lake Park',
}];


class Role extends React.Component {
  render(){
    return (
      <div>
      <div style={{fontSize: 30,marginBottom:20}}>系统管理--角色管理</div>
        <Button type='primary' style={{marginLeft:1000}}>添加</Button>
        <br /><br />
        <Table
        columns={columns}
        dataSource={data}
        bordered
      />
        <Pagination showQuickJumper defaultCurrent={1} total={200}  />
      </div>
    )
  }
}


export default  Role