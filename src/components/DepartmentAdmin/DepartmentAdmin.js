import { Table, Input, Icon, Button, Popconfirm, Pagination } from 'antd'
import ModalEdit from './modal.js'

const Search = Input.Search

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '部门编号',
      dataIndex: 'bianhao',
      width: '13%'
    }, {
      title: '部门名称',
      dataIndex: 'name',
      width: '13%'
    }, {
      title: '上级部门',
      dataIndex: 'apartment',
      width: '13%'
    }, {
      title: '部门负责人',
      dataIndex: 'fuze',
      width: '13%'
    }, {
      title: '部门所属单位',
      dataIndex: 'belong',
      width: '13%'
    }, {
      title: '部门电话',
      dataIndex: 'phone',
      width: '13%'
    }, {
      title: '部门传真',
      dataIndex: 'chuanzhen',
      width: '13%'
    }, {
      title: '备注',
      dataIndex: 'beizhu',
      width: '13%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
          <ModalEdit />
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <Button>删除</Button>
              </Popconfirm>
          </div>
        )
      }
    }]

    this.state = {
      dataSource: [{
        key: '0',
        bianhao:'1',
        name: 'Edward King 0',
        apartment:'部门',
        belong:'所属单位',
        fuze:'负责人',
        phone:'123456',
        chuanzhen:'1233213',
        beizhu:'无',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        bianhao:'2',
        name: 'Edward King 1',
        fuze:'负责人',
        chuanzhen:'1232134',
        beizhu:'无',
        apartment:'部门',
        phone:'1234565',
        belong:'所属单位',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <div style={{fontSize: 30}}>系统管理--部门管理</div>
        <br />
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Search
          placeholder="请输入查询内容"
          onSearch={value => console.log(value)}
          enterButton
          style={{width: 200, marginLeft: 820}}
        />
        <Table bordered dataSource={dataSource} columns={columns} />
        {/*<Pagination showQuickJumper defaultCurrent={1} total={200}  />*/}
      </div>
    );
  }
}

export default Department