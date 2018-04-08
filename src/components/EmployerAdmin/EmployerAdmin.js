import { Table, Pagination } from 'antd';
import ModalEdit from './modal.js'

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    people:'负责人',
    telephone:'1234567',
    chuanzhen:'1234',
    beizhu:'无',
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({value, onChange }) => (
  <div>
    {
      <p style={{ margin: '3px 0' }} onChange={e => onChange(e.target.value)}>{value}</p>
    }
  </div>
)

class Employer extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '单位名称',
      dataIndex: 'name',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '单位负责人',
      dataIndex: 'people',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: '单位电话',
      dataIndex: 'telephone',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: '单位传真',
      dataIndex: 'chuanzhen',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    },{
      title: '备注',
      dataIndex: 'beizhu',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            {
                <span>
                  <ModalEdit />
                </span>
            }
          </div>
        )
      }
    }]
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  // edit(key) {
  //   const newData = [...this.state.data];
  //   const target = newData.filter(item => key === item.key)[0];
  //   if (target) {
  //     target.editable = true;
  //     this.setState({ data: newData });
  //   }
  // }
  // save(key) {
  //   const newData = [...this.state.data];
  //   const target = newData.filter(item => key === item.key)[0];
  //   if (target) {
  //     delete target.editable;
  //     this.setState({ data: newData });
  //     this.cacheData = newData.map(item => ({ ...item }));
  //   }
  // }
  // cancel(key) {
  //   const newData = [...this.state.data];
  //   const target = newData.filter(item => key === item.key)[0];
  //   if (target) {
  //     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
  //     delete target.editable;
  //     this.setState({ data: newData });
  //   }
  // }
  render() {
    return (
      <div>
      <div style={{fontSize: 30}}>系统管理--单位管理</div>
      <br />
      <Table bordered dataSource={this.state.data} columns={this.columns} />
      {/*<Pagination showQuickJumper defaultCurrent={1} total={200}  />*/}
      </div>
  )
  }
}

export default Employer