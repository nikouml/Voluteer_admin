import React,{Component} from 'react'
import {Button} from 'antd'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import {Table, Icon, Divider,Dropdown,Menu} from 'antd';
import {Link} from 'dva/router'
import axios from 'axios/index'




const searchContent=['待审核','已审核'];
const menu = (
  <Menu >
    <Menu.Item key="1">审核通过</Menu.Item>
    <Menu.Item key="2">审核拒绝</Menu.Item>
  </Menu>
)

class ServiceUnpassList extends Component{
    constructor(props){
        super(props)
      this.state={
        Servers:[{
          key: '1',
          id:'1',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        },{
          key: '2',
          id:'2',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        },{
          key: '3',
          id:'3',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        }
        ]
      }

      this.getServer = this.getServer.bind(this)
    }
  componentWillMount()
  {
    // console.log(this.props)
    this.getServer()
  }
  getServer()
  {
    axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
      .then(res => {
        const Servers = (res.data.vpList.data || []).map((item, index) => {
          return {
            key: index,
            id: item.id,
            name: item.title,
            time: item.start_at,
            state: item.status,
          }
        })
        this.setState({Servers: Servers})
        // console.log(res.data.vpList.data[0])
        console.log(localStorage.token)
        console.log(this.state.Servers[0].id)
      })
  }
    render(){
      const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
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
          render: (text, record) => {
            console.log('a', record)
            console.log('b',text)
            return  (
              <span>
      {/*<a href="#">{record.name}</a>*/}
              <Divider type="vertical" />
              <Link to={`/unpass/${record.id}`} className="ant-dropdown-link">
        详情 <Icon type="down"/>
      </Link>
    </span>
            )
          },
    }];

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
            <Table columns={columns} dataSource={this.state.Servers}/>
          </div>
        </div>
      )
    }
}




export default ServiceUnpassList
