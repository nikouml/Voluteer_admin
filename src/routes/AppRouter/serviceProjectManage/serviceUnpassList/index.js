import React, {Component} from 'react'
import Choose from '../../component/choose/index'
import SearchDate from '../../component/searchWithDate/index'
import {Table, Icon, Dropdown, Menu, Button, message, Input, Pagination} from 'antd';
import {Link} from 'dva/router'
import axios from 'axios/index'



class ServiceUnpassList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Servers: [{
        key: '1',
        id: '1',
        name: '敬老爱老',
        time: '2015年3月21日',
        state: '待审核',
      }, {
        key: '2',
        id: '2',
        name: '敬老爱老',
        time: '2015年3月21日',
        state: '待审核',
      }, {
        key: '3',
        id: '3',
        name: '敬老爱老',
        time: '2015年3月21日',
        state: '待审核',
      }
      ],
      keyWords: "",
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pageTotal: 1,
      pageinationLoad: false,
      load:false
    }

    this.getServer = this.getServer.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  start = (string) => {
    this.setState({loading: true});

    let keys = [], indexs=[]
    if (string === 'pass') {
      let selectedRowKeys = this.state.selectedRowKeys
      for (let i = 0; i < selectedRowKeys.length; i++) {
        let num = selectedRowKeys[i]
        let server = this.state.Servers[num]
        let id = server.id
        keys.push(id)
        indexs.push(num)
      }
    } else if (string === 'reject') {
      let selectedRowKeys = this.state.selectedRowKeys
      for (let i = 0; i < selectedRowKeys.length; i++) {
        let num = selectedRowKeys[i]
        let server = this.state.Servers[num]
        let id = server.id
        keys.push(id)
      }
    }
    // ajax request after empty completing

    for (let i = 0; i < keys.length; i++) {
      const ID = keys[i]
      const URL = 'http://volunteer.andyhui.xin/vps/' + ID
      const token = localStorage.token
      let applyRes = 0
      if (string === "pass") {
        applyRes = 1
      } else {
        applyRes = 0
      }

      let apply_status = 1
      let apply_res = applyRes

      let DATES = this.state.Servers
      let DATA = DATES[indexs[i]]
      // console.log("url :",URL,"DATA: ",DATA)

      const config = {
        method: 'post',
        url: URL,
        headers: {"Content-Type": "application/json", "token": token},
        data: {
          "title": DATA.title,
          "content": DATA.content,
          "position_name": DATA.position_name,
          "position_cdn": DATA.position_cdn,
          "join_start_at": DATA.join_start_at,
          "join_end_at": DATA.join_end_at,
          "start_at": DATA.start_at,
          "end_at": DATA.end_at,
          "people_num": DATA.people_num,
          "main_picture": DATA.main_picture,
          "second_picture": DATA.second_picture,
          "third_picture": DATA.third_picture,
          "status": DATA.status,
          "type": DATA.type,
          "apply_status": apply_status,
          "apply_res": apply_res
        }
      }

      if (token) {
        axios(config)
          .then((res) => {
            if (res) {
              if (res.data.code === 2000) {
                if (string === 'pass') {
                  message.success("审核成功")
                } else if (string === 'reject') {
                  message.success("审核拒绝")
                }
              } else {
                message.error("请重新登录")
                this.props.history.push('/')
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }


  handleMenuClick(e) {
    message.info('暂时无法搜索.');
    console.log('click', e);
  }


  componentWillMount() {
    this.getServer('show')
  }

  handleSearch(e) {
    let value = e.target.value
    this.getServer("keyWords", value)
  }

  makeState(apply_status, apply_res) {
    if (apply_status === 0) {
      return "未审核"
    } else if (apply_status === 1) {
      if (apply_res === 0) {
        return "已拒绝"
      } else if (apply_res === 1) {
        return "正在发布"
      }
    }
  }

  async getServer(order, string, page) {
    if (order === 'show') {
      this.setState({load:true})


      let pageTotal = 0,total=1
      let url = 'http://volunteer.andyhui.xin/vps/apply/0'
      if (page) {
        url = url + '?page=' + page
      } else {
        url = url + '?page=1'
      }
      axios.get(url)
        .then(res => {
          // console.log("res:", res)
          pageTotal=res.data.vpList.last_page
          total=res.data.vpList.total
          const Servers = (res.data.vpList.data || []).map((item, index) => {

            let state
            state = this.makeState(item.apply_status, item.apply_res)

            return {
              title: item.title,
              content: item.content,
              position_name: item.position_name,
              position_cdn: item.position_cdn,
              join_start_at: item.join_start_at,
              join_end_at: item.join_end_at,
              start_at: item.start_at,
              end_at: item.end_at,
              people_num: item.people_num,
              main_picture: item.main_picture,
              second_picture: item.second_picture,
              third_picture: item.third_picture,
              status: item.status,
              type: item.type,
              key: index,
              id: item.id,
              name: item.title,
              time: item.start_at,
              state: state,
            }
          })
          this.setState({Servers: Servers, pageTotal: pageTotal,total:total,load:false})
        })
    }
    else if (order === "status") {

    } else if (order === "keyWords") {
      this.setState({load:true})

      let keyWords = string,str = new RegExp(keyWords),Ans = [],i = 0

      for (let k = 0; k < this.state.pageTotal; k++) {
        let page = k + 1
        let URL = 'http://volunteer.andyhui.xin/vps/apply/0?page=' + page
        await axios.get(URL)
          .then(res => {
            if (res.data.code === 2000) {
              let vpListData = res.data.vpList.data
              for (let j = 0; j < vpListData.length; j++) {
                let vpData = vpListData[j]
                if (str.test(vpData.title)) {
                  // console.log("title: ",vpData.title)
                  i = 1
                  Ans.push({
                    key: vpData.id,
                    id: vpData.id,
                    name: vpData.title,
                    time: vpData.start_at,
                    apply_status: this.makeState(vpData.apply_status, vpData.apply_res),
                  })
                  // console.log(Ans)
                }else{
                  // console.log("str: ",str,"title: ",vpData.title)
                  // /vps/apply/0-1
                }
              }
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

  handleSearchDate(e) {
    this.setState({
      Servers: e,
      pageinationLoad:true
    })
  }
  handleWait(){
    this.setState({
      load:true
    })
  }

  handleChoosePage(e) {
    let page = e
    this.getServer('show', " ", page)

  }

  render() {
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
        // render: text => <a href="#">{text}</a>,
      }, {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: "审核状态",
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <Link to={`/unpass/${record.id}`} className="ant-dropdown-link">
        详情 <Icon type="down"/>
      </Link>
    </span>
          )
        },
      }];

    const Search = Input.Search;
    let searchApplyStatus = ['待审核', '已审核']
    let searchMenu = []
    for (let i = 0; i < searchApplyStatus.length; i++) {
      searchMenu.push(<Menu.Item key={i}>{searchApplyStatus[i]}</Menu.Item>)
    }
    const menu1 = (
      <Menu onClick={this.handleMenuClick}>
        {searchMenu}
      </Menu>
    );

    let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}

    const {loading, selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    let visible = this.state.pageinationLoad
    let display = ''
    if (visible) {
      display = 'none'
    }

    return (
      <div>
        <Choose/>
        <div>
          <SearchDate handleSearchDate={this.handleSearchDate.bind(this)}
                      handleWait={this.handleWait.bind(this)}
                      Url="http://volunteer.andyhui.xin/vps/apply/0" pageTotal={this.state.pageTotal}/>
          <div style={{marginTop:-50}}>
            <Dropdown overlay={menu1}>
              <Button style={styleButton}>
                活动状态 <Icon type="down"/>
              </Button>

            </Dropdown>

            <Search
              placeholder="input search text"
              onBlur={(e) => {
                this.handleSearch(e)
              }}
              style={{width: 200, top: -1}}
              enterButton
            />
          </div>



          <br/><br/><br/><br/><br/>

        </div>

        <div style={{marginBottom: 16}}>
          <Button
            type="primary"
            onClick={() => {
              this.start("pass")
            }}
            disabled={!hasSelected}
            loading={loading}
          >
            审核通过
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.start("reject")
            }}
            disabled={!hasSelected}
            loading={loading}
          >
            审核拒绝
          </Button>


          <span style={{marginLeft: 8}}>
            {hasSelected ? `选择了 ${selectedRowKeys.length} 个` : ''}
          </span>
        </div>
        <div style={{height:424}}>
          {visible? <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.Servers} pagination={{pageSize:5}} loading={this.state.load}/> : <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.Servers} pagination={visible} loading={this.state.load} /> }
          {/*<Table rowSelection={rowSelection} columns={columns} dataSource={this.state.Servers} pagination={visible}/>*/}
          <Pagination defaultCurrent={1} total={this.state.total} pageSize={5} onChange={(e) => {
            this.handleChoosePage(e)
          }} style={{display: display,float:"right",lineHeight:1.5,marginTop:15,marginBottom:15}}/>
        </div>


      </div>
    )
  }
}


export default ServiceUnpassList
