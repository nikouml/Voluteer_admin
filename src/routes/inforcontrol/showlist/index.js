import React from 'react'
import { Table, Input, Popconfirm, Icon } from 'antd'

const columns = [
  {title: '序号', dataIndex: 'num', key: 'num'},
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '点赞', dataIndex: 'age', key: 'age'},
  {title: '服务总次数', dataIndex: 'address', key: 'address'},
  {title: '操作', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a>},
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    num: `${i}`,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    totalnum: `${i}`
  })
}
const EditableCell = ({editable, value, onChange}) => (
  <div>
    {editable
      ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
)

export default class showactive extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '序号',
      dataIndex: 'name',
      width: '8%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '活动名称',
      dataIndex: 'age',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: '结束时间',
      dataIndex: 'address',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: '发布',
      dataIndex: 'status',
      width: '15%',
      // render:(text, record) => this,renderColumns(text, record, 'status'),
    }, {
      title: '点赞',
      dataIndex: 'zan',
      width: '15%',
    }, {
      title: '分享',
      dataIndex: 'share',
      width: '15%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const {editable} = record
        return (
          <div className="editable-row-operations">
            {
              editable ? <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>Edit</a>
            }
          </div>
        )
      },
    }]
    this.state = {data}
    this.cacheData = data.map(item => ({...item}))
  }

  renderColumns (text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    )
  }

  handleChange (value, key, column) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value
      this.setState({data: newData})
    }
  }

  edit (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target.editable = true
      this.setState({data: newData})
    }
  }

  save (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      delete target.editable
      this.setState({data: newData})
      this.cacheData = newData.map(item => ({...item}))
    }
  }

  cancel (key) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
      delete target.editable
      this.setState({data: newData})
    }
  }

  render () {
    return (
      <div>
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />

          &nbsp;&nbsp;服务基地
        </div>
        <Table bordered dataSource={this.state.data} columns={this.columns} />
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />
          &nbsp;&nbsp;
          志愿达人显示
        </div>
        <div className="show-three-list">
          累计服务次数
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
            dataSource={data}
          />
        </div>
        <div className="show-three-list">
          累计服务时长
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
            dataSource={data}
          />
        </div>
        <div className="show-three-list">
          累计星级个数
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
            dataSource={data}
          />
        </div>
      </div>

    )
  }
}