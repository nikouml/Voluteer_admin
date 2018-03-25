import React,{Component} from 'react'
import {Button} from 'antd'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import {Table, Icon, Divider,Dropdown,Menu} from 'antd';
import {Link} from 'dva/router'



class ServiceUnpassList extends Component{

    constructor(props){
        super(props)
    }

    render(){

      const searchContent=['待审核','已审核'];
      const menu = (
        <Menu >
          <Menu.Item key="1">审核通过</Menu.Item>
          <Menu.Item key="2">审核拒绝</Menu.Item>
        </Menu>
      );
      return(
        <div>
          <Choose/>


          <div >
          <Search searchContent={searchContent}/>
          </div>
          <div >
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          </div>

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
  }, {
    title: '发布时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: '审核状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
      {/*<a href="#">{record.name}</a>*/}
        {/*<Divider type="vertical" />*/}
        <Link to="/unpass/1" className="ant-dropdown-link">
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
  state: '待审核',
}, {
  key: '2',
  name: '乘客疏导',
  writer: 'dyx',
  time: '2015年3月21日',
  num: 2,
  state: '待审核',
}, {
  key: '3',
  name: '清扫楼道',
  writer: 'ccc',
  time: '2015年3月21日',
  num: 3,
  state: '待审核'
}];

export default ServiceUnpassList
