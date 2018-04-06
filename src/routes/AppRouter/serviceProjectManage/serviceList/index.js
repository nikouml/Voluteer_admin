import React, { Component } from 'react'
// import {BrowserRouter as Router,Link} from 'react-router-dom'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import {Input, Menu, Dropdown, Button, Icon, message, Divider, DatePicker,Table} from 'antd'
import { Link } from 'dva/router'
import axios from 'axios'

import moment from 'moment'

const dateFormat = 'YYYY-MM-DD';


const APIDateFormate= "YYYY-MM-DD hh:mm:ss"


const {RangePicker} = DatePicker;


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
        Servers: [
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
        ],
        dataRange:[]
      }
    }
    this.getServer = this.getServer.bind(this)
    this.onChangeDate=this.onChangeDate.bind(this)
    this.handleSearch=this.handleSearch.bind(this)
  }

  componentWillMount () {
    this.getServer()
  }

  handleMenuClick(e) {
    message.info('暂时无法搜索.');
    console.log('click', e);
  }

  handleSearch(e){

    let value=e.target.value

    // console.log(e.target.value)
    // this.setState({keyWords:value})
    this.getServer("keyWords",value)
  }

  onChangeDate(e){

    //http://momentjs.cn/docs/#/displaying/calendar-time/ 文档
    let dates=e.valueOf()
    this.setState({
      dateRange:[dates[0],dates[1]]
    })
    // console.log("123")
    // console.log(this.state.dateRange)
    // let dateTest=moment("2018-04-26 12:09:47","YYYY-MM-DD hh:mm:ss")
    // console.log(dateTest.calendar())
    this.getServer("date")
  }

  getServer(order,string)
  {
    if(!order){
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
          console.log(Servers)
          console.log(localStorage.token)
          // console.log(this.state.Servers)
        })
    }else if(order==="date"){

      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          let i=0;
          const Servers = (res.data.vpList.data || []).map((item, index) => {


            let joinData=item.start_at
            joinData=joinData.substr(0,10)


            let Start=this.state.dateRange[0]
            Start=Start.calendar(null,{sameElse:"YYYY-MM-DD"})

            let End=this.state.dateRange[1]
            End=End.calendar(null,{sameElse:"YYYY-MM-DD"})

            // console.log(joinData,"1")
            // console.log(Start,"2")
            // console.log(End,"3")


            if(moment(joinData).isBetween(Start,End)){
              i=1
              return {
                key: index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: item.status,
              }
            }else{}
          })
          if(i){
            this.setState({Servers: Servers})
          }else {
            this.setState({Servers:[{
                key: 1,
                id:1,
                name: '没有找到',
                time: '没有找到',
                state: '没有找到',
              }]})
          }
          // console.log(res.data.vpList.data[0])
          console.log(localStorage.token)
          // console.log(this.state.Servers)
        })

    }else if(order==="status"){

    }else if(order==="keyWords"){
      let keyWords=string
      console.log("keywords: ",keyWords)
      let i=0
      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          const Servers = (res.data.vpList.data || []).map((item, index) => {

            let  str=new RegExp(keyWords)

            console.log(item.title,"and",str)
            if(str.test(item.title)){
              i=1
              return {
                key: index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: item.status,
              }
            }else {}

          })
          if(i){
            this.setState({Servers: Servers})
          }else {
            this.setState({Servers:[{
                key: 1,
                id:1,
                name: '没有找到',
                time: '没有找到',
                state: '没有找到',
              }]})
          }
          // console.log(res.data.vpList.data[0])
          console.log(localStorage.token)
          // console.log(this.state.Servers)
        })

    }

  }

  render () {
    const searchContent = ['正在报名', '正在进行', '已结束', '发布人']

    const Search = Input.Search;

    let searchMenu = []
    for (let i = 0; i < searchContent.length; i++) {
      searchMenu.push(<Menu.Item key={i}>{searchContent[i]}</Menu.Item>)
    }
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {searchMenu}
      </Menu>
    );

    let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}

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

        <RangePicker
          defaultValue={[moment('2018-01-01', dateFormat), moment('2017-02-01', dateFormat)]}
          format={dateFormat}
          onChange={this.onChangeDate}
        />

        <Dropdown overlay={menu}>
          <Button style={styleButton}>
            活动状态 <Icon type="down"/>
          </Button>

        </Dropdown>

        <Search
          placeholder="input search text"
          onBlur={(e)=>{this.handleSearch(e)}}
          style={{width: 200,top:-1}}
          enterButton
        />

        <div className="show">
          <Table columns={columns} dataSource={this.state.Servers} />
        </div>
      </div>

    )
  }
}

export default ServiceList
