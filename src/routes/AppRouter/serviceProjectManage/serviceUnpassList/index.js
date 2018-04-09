import React, {Component} from 'react'
import Choose from '../../component/choose/index'
import SearchDate from '../../component/searchWithDate/index'
import {Table, Icon, Dropdown, Menu, Button, message, Input} from 'antd';
import {Link} from 'dva/router'
import axios from 'axios/index'


const searchContent = ['未审核', '已拒绝'];

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
    }

    this.getServer = this.getServer.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  start = (string) => {
    this.setState({loading: true});

    let keys = []
    if (string === 'pass') {
      let selectedRowKeys = this.state.selectedRowKeys
      for (let i = 0; i < selectedRowKeys.length; i++) {
        let num = selectedRowKeys[i]
        let server = this.state.Servers[num]
        let id = server.id
        keys.push(id)
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
        applyRes = 0
      } else {
        applyRes = 1
      }

      let apply_status = 1
      let apply_res = applyRes

      let DATES = this.state.Servers
      let DATA = DATES[i]

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
                if(string==='pass'){
                  message.success("审核成功")
                }else if(string==='reject'){
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
    this.getServer()
  }

  handleSearch(e) {
    let value = e.target.value
    this.getServer("keyWords", value)
  }

  getServer(order, string) {
    if (!order) {
      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          // console.log("res:", res)
          const Servers = (res.data.vpList.data || []).map((item, index) => {
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
              apply_status: searchContent[item.apply_status],
            }
          })
          this.setState({Servers: Servers})
        })
    }
    else if (order === "status") {

    } else if (order === "keyWords") {
      let keyWords = string
      // console.log("keywords: ", keyWords)
      let i = 0
      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          let Servers = (res.data.vpList.data || []).map((item, index) => {
            let str = new RegExp(keyWords)
            if (str.test(item.title)) {
              i = 1
              return {
                key:index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                apply_status: searchContent[item.apply_status],
              }
            } else {

            }

          })

          if (i) {
            let Ans = []
            for (let i = 0; i < Servers.length; i++) {
              if (typeof(Servers[i]) === "undefined") {
              }
              else {
                Ans.push(Servers[i])
              }
            }
            Servers = Ans
            this.setState({Servers: Servers})
          } else {
            this.setState({
              Servers: [{
                key:1,
                id: 1,
                name: '没有找到',
                time: '没有找到',
                apply_status: '没有找到',
              }]
            })
          }
        })

    }

  }

  handleSearchDate(e) {
    this.setState({
      Servers: e
    })
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
        dataIndex: 'apply_status',
        key: 'apply_status'
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

    return (
      <div>
        <Choose/>
        <div>
          <SearchDate handleSearchDate={this.handleSearchDate.bind(this)}
                      Url="http://volunteer.andyhui.xin/vps/list/0"/>
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.Servers}/>


      </div>
    )
  }
}


export default ServiceUnpassList
