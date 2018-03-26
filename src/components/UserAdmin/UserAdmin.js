import { Table, Button, Icon, Input, Pagination } from 'antd'
const Search = Input.Search;

const columns = [{
  title: '用户编号',
  dataIndex: 'name',
}, {
  title: '登录名',
  dataIndex: 'age',
}, {
  title: '真实姓名',
  dataIndex: 'address',
}, {
  title: '所属单位',
  dataIndex: 'address',
}, {
  title: '所属部门',
  dataIndex: 'address',
}, {
  title: '所属角色',
  dataIndex: 'address',
}, {
  title: '联系电话',
  dataIndex: 'address',
}, {
  title: '邮箱',
  dataIndex: 'address',
}, {
  title: '备注',
  dataIndex: 'address',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '操作',
  dataIndex: 'options',
}]

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Item ${i}`,
    age: 32,
    address: `no. ${i}`,
    status: (<Icon type="smile" />),
    options:(<Icon type="edit" /> ,<Icon type="close" />, <Icon type="copy" />),
  })
}

class User extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{fontSize: 30}}>系统管理--用户管理</div>
        <br /><br />
        <Button type="primary" style={{marginRight:20}}><Icon style={{fontSize: 20}}  type="user-add" /> 内部用户</Button>
        <Button type="primary" style={{marginRight:20}}><Icon style={{fontSize: 20}} type="global" /> 域配置</Button>
        <Button type="primary" style={{marginRight:20}}><Icon style={{fontSize: 20}} type="usergroup-add" /> 域用户</Button>
        <br /><br />
        <Search
          placeholder="请输入查询内容"
          onSearch={value => console.log(value)}
          style={{ width: 200,marginLeft: 700, marginRight: 10 }}
        />
        <Icon type="folder" style={{marginRight: 10}} />
        <Icon type="download" style={{marginRight: 10}} />
        <Icon type="share-alt" style={{marginRight: 10}} />
        <Icon type="plus" style={{marginRight: 10}} />
        <Icon type="minus" style={{marginRight: 10}} />
        <Icon type="minus-circle" style={{marginRight: 10}} />
        <Icon type="exclamation-circle-o" style={{marginRight: 10}} />
        <br />
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        <Pagination showQuickJumper defaultCurrent={1} total={200}  />
      </div>
    );
  }
}

export default User