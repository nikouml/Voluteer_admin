import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import { Link } from 'dva/router'
import { Input, Button, Table } from 'antd'
import './index.css'
import path, { namesMap } from 'routerForm/index'

const {personc} = namesMap

const Search = Input.Search
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}, {
  title: 'Action',
  key: 'operation',
  fixed: 'right',
  width: 100,
  render: () => <a href="#">action</a>,
}]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

@routerPush
@immutableRenderDecorator
export default class AsyncPage extends PureComponent {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  }
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
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({selectedRowKeys})
  }

  render () {
    const {loading, selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <div className="front-title">群众及党员信息管理</div>
        <br />
        <br />
        <div className="first-title"> 筛选党（工）委党工团身份</div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{width: 200, marginLeft: 20}}
        />
        <Button type="primary">新建标签</Button>
        <div className="information-table">
          <div style={{marginBottom: 16}}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{marginLeft: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
        <Link to={path(personc)}>
          dhasu
        </Link>
      </div>
    )
  }
}
