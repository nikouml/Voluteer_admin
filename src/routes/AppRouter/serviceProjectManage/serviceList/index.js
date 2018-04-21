import React, { Component } from 'react'
import Choose from '../../component/choose/index'
import SearchDate from '../../component/searchWithDate/index'
import { Input, Menu, Dropdown, Button, Icon, message, Table, Pagination } from 'antd'
import { Link } from 'dva/router'
import axios from 'axios'

const stateName = ['发布成功', '报名中', '报名结束活动未开始', '活动进行中', '活动结束']

class ServiceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vpList: {
        Servers: [
          {
            key: '1',
            id: '1',
            title: '敬老爱老',
            user_name: 'cxy',
            start_at: '2015年3月21日',
            status: '发布成功',
            people_num: 3,
            has_people_num: 1
          }
        ],
        dataRange: []
      },
      pageinationLoad: false,
      pageTotal: 1,
      total:1,
      load:false
    }
    this.getServer = this.getServer.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount () {
    this.getServer('show')
  }

  async handleMenuClick (e) {
    let value = e.key
    let status
    if (value === '0') {
      status = 1
    }
    else if (value === '1') {
      status = 3
    }
    else {
      status = 4
    }
    let url = 'http://volunteer.andyhui.xin/vps/list/' + status
    let Ans = [], i=0, pageTotal = this.state.pageTotal, URL
    let k
    for (k = 0; k < pageTotal; k++) {
      let Servers = []
      let page = k + 1
      URL = url + '?page=' + page
      await axios.get(URL)
        .then(res => {
          console.log('menures:', res)
          if (res.data.code === 2000) {
            Servers = (res.data.vpList.data || []).map((item, index) => {
              let State = stateName[item.status]
              i = i + 1
              return {
                key: item.id,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: State,
                people_num: item.people_num,
                has_people_num: item.has_people_num,
                writer: item.user_name
              }

            })
            if (i) {
              for (let i = 0; i < Servers.length; i++) {
                if (typeof(Servers[i]) === 'undefined') {
                }
                else {
                  Ans.push(Servers[i])
                }
              }
            }
          }
          else {
            message.error('请重新登录')
            this.props.history.push('/')
          }
        })
    }
    if (i) {
      this.setState({Servers: Ans, pageinationLoad: true})
    } else {
      this.setState({
        Servers: [{
          key: 1,
          id: 1,
          name: '无记录',
          time: '无记录',
          state: '无记录',
        }],
        pageinationLoad: true
      })
    }
  }

  handleSearch (e) {
    let value = e
    this.getServer('keyWords', value)
  }

  handleSearchDate (e) {
    if(e){
      this.setState({
        Servers: e,
        pageinationLoad:true,
        load:false
      })
    }
  }

  handleWait(){
    this.setState({
      load:true
    })
  }

  async getServer (order, string, page) {
    if (order === 'show') {
      this.setState({load:true})

      let url = 'http://volunteer.andyhui.xin/vps/apply/1'
      if (page) {
        url = url + '?page=' + page
      } else {
        url = url + '?page=1'
      }
      // console.log(url)
      axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
      axios.get(url)
        .then(res => {
          if (res.data.code === 2000) {
            // console.log(res)
            let pageTotal = res.data.vpList.last_page
            let total=res.data.vpList.total
            const Servers = (res.data.vpList.data || []).map((item, index) => {
              let State
              if (item.apply_status === 0) {
                if (item.apply_res === 0) {
                  State = '未审核'
                }
              } else if (item.apply_status === 1) {
                if (item.apply_res === 0) {
                  State = '已拒绝'
                } else {
                  State = stateName[item.status]
                }
              }
              return {
                key: index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: State,
                people_num: item.people_num,
                has_people_num: item.has_people_num,
                writer: item.user_name
              }
            })
            this.setState({Servers: Servers, pageTotal: pageTotal,total:total,load:false})
          }
          else {
            message.error('请重新登录')
            this.props.history.push('/')
          }
        })
    }
    else if (order === 'status') {

    } else if (order === 'keyWords') {
      this.setState({load:true})

      let Ans = [], i = 0, keyWords = string, pageTotal = this.state.pageTotal, URL, Index = 1
      let k
      for (k = 0; k < pageTotal; k++) {
        let Servers = []
        let page = k + 1
        URL = 'http://volunteer.andyhui.xin/vps/apply/1' + '?page=' + page
        axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
        // console.log(URL)
        await axios.get(URL)
          .then(res => {
            if (res.data.code === 2000) {
              // console.log(res.data.vpList.data)
              Servers = (res.data.vpList.data || []).map((item, index) => {

                let State
                if (item.apply_status === 0) {
                  if (item.apply_res === 0) {
                    State = '未审核'
                  }
                } else if (item.apply_status === 1) {
                  if (item.apply_res === 0) {
                    State = '已拒绝'
                  } else {
                    State = stateName[item.status]
                  }
                }

                let str = new RegExp(keyWords)
                if (str.test(item.title)) {
                  i = i + 1
                  return {
                    key: item.id,
                    writer: item.user_name,
                    id: item.id,
                    name: item.title,
                    time: item.start_at,
                    state: State,
                    people_num: item.people_num,
                    has_people_num: item.has_people_num,
                  }
                  Index++
                } else {
                }
              })
              if (i) {
                for (let i = 0; i < Servers.length; i++) {
                  if (typeof(Servers[i]) === 'undefined') {
                  }
                  else {
                    Ans.push(Servers[i])
                  }
                }
                // console.log("Ans: ",Ans)
              }
            }
            else {
              message.error('请重新登录')
              this.props.history.push('/')

            }
          })
        if (i) {
          this.setState({Servers: Ans, pageinationLoad: true,load:false})
        } else {
          this.setState({
            Servers: [{
              key: 1,
              id: 1,
              name: '无记录',
              time: '无记录',
              state: '无记录',
            }],
            pageinationLoad: true,
            load:false
          })
        }
      }
    }
  }

  handleChoosePage (e) {
    // console.log(e)
    // this.setState({
    //   currentPage:e
    // })
    let page = e
    // console.log(page)
    this.getServer('show', ' ', page)

  }

  render () {
    const searchContent = ['正在报名', '正在进行', '已结束']
    const Search = Input.Search
    let searchMenu = []
    for (let i = 0; i < searchContent.length; i++) {
      searchMenu.push(<Menu.Item key={i}>{searchContent[i]}</Menu.Item>)
    }
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        {searchMenu}
      </Menu>
    )

    let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}

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
        dataIndex: 'people_num',
        key: 'people_num'
      },
      {
        title: '已参加人数',
        dataIndex: 'has_people_num',
        key: 'has_people_num'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
             <Link to={`/activity/${record.id}`} className="ant-dropdown-link">
               详情 <Icon type="down" />
      </Link>
    </span>
        ),
      }]

    let visible = this.state.pageinationLoad
    let display = ''
    if (visible) {
      display = 'none'
    }

    return (
      <div>

        <Choose />
        <SearchDate handleSearchDate={this.handleSearchDate.bind(this)}
                    handleWait={this.handleWait.bind(this)}
                    Url="http://volunteer.andyhui.xin/vps/apply/1"  pageTotal={this.state.pageTotal}/>


        <div style={{marginTop:-50}}>
          <Dropdown overlay={menu}>
            <Button style={styleButton}>
              活动状态 <Icon type="down" />
            </Button>

          </Dropdown>

          <Search
            placeholder="input search text"
            style={{width: 200, top: -1}}
            onSearch={this.handleSearch}
            enterButton
          />
        </div>


        <div className="show" style={{marginTop:100,height:424}}>
          {visible? <Table columns={columns} dataSource={this.state.Servers} pagination={{pageSize:5}} loading={this.state.load}/> : <Table columns={columns} dataSource={this.state.Servers} pagination={visible} loading={this.state.load}/> }
          {/*<Table columns={columns} dataSource={this.state.Servers} pagination={visible} />*/}
          <Pagination defaultCurrent={1} total={this.state.total} pageSize={5} onChange={(e) => {this.handleChoosePage(e)}}
                      style={{display: display,marginTop:15,marginBottom:15,float:"right",lineHeight:1.5}} />
        </div>
      </div>

    )
  }
}

export default ServiceList
