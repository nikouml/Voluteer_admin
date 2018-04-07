import React, { Component } from 'react'
// import {BrowserRouter as Router,Link} from 'react-router-dom'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import { Table, Icon, Divider } from 'antd'
import { Link } from 'dva/router'
import axios from 'axios'

function itemRender (route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
}

class ServiceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id:'',
      aname:'',
      writer:'',
      start_time:'',
      state:'',
      people:'',
      has_people:'',
      has_people:''

    }
    this.getServer = this.getServer.bind(this)
  }

  componentWillMount () {
    this.getServer()
  }

  getServer () {
    axios.get(`http://volunteer.andyhui.xin/vps/`)
      .then(res => {
        console.log("123")
        console.log(res.data)
        const dataSource = (res.data.vpList || [] ).map((item,index) =>{
          return{
            id:index,
            key:item.id,
            aname:item.title,
            writer:item.user_name,
            start_time:item.create_at,
            state:item.status,
            people:item.people_num,
            has_people:item.has_people_num,
          }

        })

        this.setState({dataSource: dataSource})
        console.log(res.data.vpList)
      })
  }

  render () {
    const searchContent = ['正在报名', '正在进行', '已结束', '发布人']
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
        title: '人数',
        dataIndex: 'people',
        key: 'people'
      },
      {
        title:'已参加人数',
        dataIndex:'has_people',
        key:'people_num'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
      {/*<a href="#">{record.name}</a>*/}
            {/*<Divider type="vertical" />*/}
            <Link to="/activity/1" className="ant-dropdown-link">
               {/*应获取一个id值，以此id数值作为url*/}
              {/*怎么在路由表添加一个动态路由*/}
              详情 <Icon type="down" />
      </Link>
    </span>
        ),
      }]

    return (
      <div>
        {/*<Breadcrumb itemRender={itemRender} routes={routes}/>;*/}
        <Choose />
        <Search searchContent={searchContent} />
        <div className="show">
          <Table columns={columns} dataSource={this.state.dataSource} />
        </div>
      </div>

    )
  }
}

export default ServiceList
