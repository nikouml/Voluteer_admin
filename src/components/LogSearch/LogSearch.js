import { Table, Input, Button, Icon, Pagination} from 'antd'
import './index.less'

const Search = Input.Search

const columns = [{
  title: '发生时间',
  dataIndex: 'startTime',
  render: text => <a href="#">{text}</a>,
}, {
  title: '用户名',
  className: 'column-money',
  dataIndex: 'username',
}, {
  title: '登录IP地址',
  dataIndex: 'IPaddress',
}, {
  title: '模块',
  dataIndex: 'model',
}, {
  title: '登日志描述',
  dataIndex: 'log',
}];

const data = [{
  key: '1',
  startTime: '2018-01-30 14:49:30',
  username: 'admin',
  IPaddress: '192.168.30.116',
  model: '首页管理',
  log: '登录成功',
}, {
  key: '2',
  startTime: '2018-01-30 14:49:30',
  username: 'null',
  IPaddress: 'null',
  model: '首页管理',
  log: '登录成功',
}, {
  key: '3',
  startTime: '2018-01-30 14:49:30',
  username: 'admin',
  IPaddress: '192.168.30.116',
  model: '首页管理',
  log: '登录成功',
}];


class Log extends React.Component {
  render(){
    return (
      <div>
        <div style={{fontSize: 30,marginBottom:20}}>系统管理--日志查询</div>
        <hr />
        <br /><br />
        发生时间：<Input className='myinput' placeholder="发生开始时间" />
        至 <Input className='myinput' placeholder='发生结束时间' />
        <Search
          placeholder="请输入查询内容"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
          className='myinput'
        />
        <Icon type="file-excel" />
        <Button className='mybutton'>导出总表</Button>
        <br /><br />
        <Table
          columns={columns}
          dataSource={data}
          bordered
        />
        {/*<Pagination showQuickJumper defaultCurrent={1} total={200}  />*/}
      </div>
    )
  }
}


export default  Log