import { Table, Input, Icon, Button, Popconfirm } from 'antd'

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class Employer extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '负责人',
      dataIndex: 'person',
      render: (text, record) => this.renderColumns(text, record, 'person'),
    }, {
      title: '电话',
      dataIndex: 'phone',
      render: (text, record) => this.renderColumns(text, record, 'phone'),
    }, {
      title: '传真',
      dataIndex: 'fax',
      render: (text, record) => this.renderColumns(text, record, 'fax'),
    }, {
      title: '备注',
      dataIndex: 'remark',
      render: (text, record) => this.renderColumns(text, record, 'remark'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const {editable} = record
        return (
          <div>
            {
              this.state.dataSource.length >= 1 &&
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                  <a href="javascript:;">Delete</a>
                </Popconfirm>
              )
            }
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                  <a onClick={() => this.save(record.key)}>Save     </a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                  : <a onClick={() => this.edit(record.key)}>Edit</a>
              }
            </div>
          </div>
        )},
    }]

    this.state = {
      dataSource: [{
        key: '0',
        name: 'name 0',
        person: '32',
        phone: 'phone 1',
        fax: 123,
        remark: 456
      }, {
        key: '1',
        name: 'name 1',
        person: '32',
        phone: 'phone 1',
        fax: 123,
        remark: 456,
      }],
      count: 2,
    }
    this.cacheData = this.state.dataSource.map(item => ({...item}))
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ dataSource: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ dataSource: newData });
    }
  }
  save(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ dataSource: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ dataSource: newData });
    }
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `name ${count}`,
      person: 32,
      phone: `phone ${count}`,
      fax:123,
      remark: 456,
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
        <div style={{fontSize: 30}}>系统管理--单位管理</div>
        <br />
        <Button  type='primary' className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <br />
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default  Employer