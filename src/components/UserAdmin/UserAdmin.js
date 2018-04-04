import { Table, Button, Icon, Input, Pagination } from 'antd'
import axios from 'axios/index.js'

const Search = Input.Search

const columns = [{
  title: '用户编号',
  dataIndex: 'id',
}, {
  title: '登录名',
  dataIndex: 'name',
}, {
  title: '真实姓名',
  dataIndex: 'truename',
}, {
  title: '所属单位',
  dataIndex: 'belongd',
}, {
  title: '所属部门',
  dataIndex: 'belongb',
}, {
  title: '所属角色',
  dataIndex: 'belongj',
}, {
  title: '联系电话',
  dataIndex: 'phone',
}, {
  title: '邮箱',
  dataIndex: 'mail',
}, {
  title: '备注',
  dataIndex: 'more',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '操作',
  dataIndex: 'options',
}]

// const data = []
// for (let i = 0; i < 4; i++) {
//   data.push({
//     key: i,
//     id: i,
//     name: `Item ${i}`,
//     turename: 32,
//     belongd: `no. ${i}`,
//     belongb: `123`,
//     belongj: `2313`,
//     phone: `1321434`,
//     mail: `asd`,
//     more: `asdfdas`,
//     status: ( <Icon type="smile" />),
//     options: ( <Icon type="edit" />),
//   })
// }

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [{
        key: 1,
        id: 1,
        name: `Item ${1}`,
        turename: 32,
        belongd: `no. ${1}`,
        belongb: `123`,
        belongj: `2313`,
        phone: `1321434`,
        mail: `asd`,
        more: `asdfdas`,
        status: (<Icon type="smile" />),
        options: (<Icon type="edit" />),
      }
      ]

    }
    this.getInfo = this.getInfo.bind(this)
  }

  // state = {
  //   selectedRowKeys: [], // Check here to configure the default column
  //   loading: false,
  // }
  start = () => {
    this.setState({loading: true})
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    }, 1000)
  }
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({selectedRowKeys})
  }

  componentWillMount () {
    this.getInfo()
  }

  getInfo () {
    axios.get(`http://volunteer.andyhui.xin/users/all`)
      .then(res => {
        const data = (res.data.usersList.data || []).map((item, index) => {
          return {
            key: index,
            id: item.id,
            name: item.name,
            turename: item.true_name,
            belongd: `暂无`,
            belongb: `暂无`,
            belongj: `暂无`,
            phone: item.mobile,
            mail: item.email,
            more: `暂无`,
            status: (item.status ? `待审核` : `审核通过`)
          }
        })
        this.setState({data: data})
        console.log('ture')
      })

  }

  render () {
    const {loading, selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    // const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <div style={{fontSize: 30}}>系统管理--用户管理</div>
        <br /><br />
        <Button type="primary" style={{marginRight: 20}}><Icon style={{fontSize: 20}} type="user-add" /> 内部用户</Button>
        <Button type="primary" style={{marginRight: 20}}><Icon style={{fontSize: 20}} type="global" /> 域配置</Button>
        <Button type="primary" style={{marginRight: 20}}><Icon style={{fontSize: 20}}
                                                               type="usergroup-add" /> 域用户</Button>
        <br /><br />
        <Search
          placeholder="请输入查询内容"
          onSearch={value => console.log(value)}
          style={{width: 200, marginLeft: 700, marginRight: 10}}
        />

        <br />
        <div style={{marginBottom: 16}}>
          <Button
            type="primary"
            onClick={this.start}
            // disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{marginLeft: 8}}>
            {/*{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}*/}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
        <Pagination showQuickJumper defaultCurrent={1} total={20} />
      </div>
    )
  }
}

export default User