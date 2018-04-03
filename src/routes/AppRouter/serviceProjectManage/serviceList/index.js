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
      vpList: {
        total: 1,
        per_page: 5,
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        from: 1,
        to: 1,
        dataSource: [
          {
            key: '1',
            id: '1',
            title: '敬老爱老',
            user_name: 'cxy',
            start_at: '2015年3月21日',
            status: '0',
            people: '1',
            people_num: 1,
          }
        ]
      }
    }
    this.getServer = this.getServer.bind(this)
  }

  componentWillMount () {
    this.getServer()
  }

  getServer () {
    axios.get(`http://volunteer.andyhui.xin/vps/list/{status}`)
      .then(res => {
        console.log("123")
        console.log(res.data)
        const dataSource = [
          {
            key: 1,
            id: res.data.vpList.data.id,
            title: res.data.vpList.data.title,
            user_name: res.data.vpList.data.user_name,
            start_at: res.data.vpList.data.start_at,
            status: res.data.vpList.data.status,
            people: res.data.vpList.data.people_num,
            people_num: res.data.vpList.data.has_people_num,
          }
        ]
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
