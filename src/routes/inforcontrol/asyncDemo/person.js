import React from 'react'
import {
  Tabs,
  Table,
  Badge,
  Menu,
  Dropdown,
  Icon,
  Input,
  Col,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascader
} from 'antd'

import TweenOne from 'rc-tween-one'
import PropTypes from 'prop-types'
import './person.css'

const InputGroup = Input.Group
const Option = Select.Option
const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
)
const Search = Input.Search
const columns = [
  {title: '序号', dataIndex: 'date', key: 'date'},
  {title: '活动名称', dataIndex: 'name', key: 'name'},
  {title: '发布时间', key: 'state', render: () => <span><Badge status="success" />Finished</span>},
  {title: '活动状态', dataIndex: 'upgradeNum', key: 'upgradeNum'},
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: () => (
      <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>
            <Dropdown overlay={menu}>
              <a href="#">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
    ),
  },
]
const data = []
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56',
  })
}
const TabPane = Tabs.TabPane
export default class persinfor extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: 'content-table'
  }

  state = {
    show: 0,
  }
  onChange = (key) => {
    this.setState({show: parseInt(key)})
  }

  getBlockChildren = (item, i) => {
    const tag = item.tag
    const img = item.img
    const text = item.text
    const zujian = item.zujian
    const zujian2 =item.zujian2
    const zujian3 = item.zujian3
    return (
      <TabPane
        key={i}
        tab={(<span
          className={`${this.props.className}-tag`}
          id={`${this.props.id}-tagBlock${i}`}
        >
          {tag.tag}
        </span>)}
      >
        <TweenOne.TweenOneGroup
          enter={{y: 30, delay: 300, opacity: 0, type: 'from', ease: 'easeOutQuad'}}
          leave={null}
          component=""
        >
          {this.state.show === i && (
            <div key="content">
              <div
                className={`${this.props.className}-img`}
                id={`${this.props.id}-imgBlock${i}`}
              >
                {img}
              </div>
              <div
                className={`${this.props.className}-text`}
                id={`${this.props.id}-textBlock${i}`}
                dangerouslySetInnerHTML={{__html: text}}
              />
            </div>)}
        </TweenOne.TweenOneGroup>
        {zujian}
        {zujian2}
        {zujian3}
      </TabPane>
    )
  }

  render () {
    const childrenData = [{
      tag: {tag: '他的项目管理'},
      // img: <img width="100%" src="https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png" />,
      // text: ``   ,
      zujian: <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
        style={{width: 200}}
      />,
      zujian2:  <InputGroup compact>
        <Select defaultValue="1">
          <Option value="1">Between</Option>
          <Option value="2">Except</Option>
        </Select>
        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
        <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
        <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
      </InputGroup>,
      zujian3:   <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
  },
    {
      tag: {tag: '他的个人信息'}
    ,
      // img: <img width="100%" src="https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png" />,
      text: `
            <div class="ii">
            <div class="i-list">姓名</div>
            <div class="i-list">联系方式</div>
            <div class="i-list">身份类型</div>
            <div class="i-list">身份证号码</div>
            <div class="i-list">党组织机构</div>
            <div class="i-list">联系地址</div>
            <div class="i-list">邮箱</div>
            <div class="i-list">注册时间</div>
            <div class="i-list">累计服务时长</div>
            <div class="i-list">累计服务次数</div>
            <div class="i-list">累计星级评价</div>
            <div class="i-list">累计发布需求</div>
            
</div>



`,
    }
  ]
    const tabsChildren = childrenData.map(this.getBlockChildren)
    return (
      <div>
        <Tabs key="tabs" onChange={this.onChange} activeKey={`${this.state.show}`}>
          {tabsChildren}
        </Tabs>
      </div>
    )
  }
}