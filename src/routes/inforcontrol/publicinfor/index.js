import 'antd/dist/antd.css'
import './index.css'
import axios from 'axios'
import React from 'react'
import { Tabs, Icon, Input, Button, Table, Popconfirm, Menu, Dropdown,message } from 'antd'
import TweenOne from 'rc-tween-one'
import PropTypes from 'prop-types'


const EditableCell = ({editable, value, onChange}) => (
  <div>
    {editable
      ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
)
const {TextArea} = Input
const TabPane = Tabs.TabPane
export default class incontrol extends React.Component {

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
    const edit = item.edit
    const button = item.button
    const submit = item.submit
    const preior = item.preior
    const title = item.title
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
        {preior}
        {title}
        {edit}
        {button}
        {submit}
      </TabPane>
    )
  }

  constructor (props) {
    super(props)
    this.columns = [{
      title: '公告序号',
      dataIndex: 'sys_id',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '公告创建人',
      dataIndex: 'user_name',
      width: '15%',
    }, {
      title: '公告内容',
      dataIndex: 'sys_content',
      width: '45%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    },
      {
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
                  : <a onClick={() => this.edit(record.key)}>编辑</a>
              }
            </div>
          )
        }
      }
    ]
    this.state = {
      data: [
        {
          sys_content: 'i+++ ',
          sys_id: '11',
          user_name: '韩笑666',
          nameinput: '无内容 ',
          sys_title: '公告标题'
        }
      ]

    }
    this.cacheData = this.state.data.map(item => ({...item}))
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getinfo = this.getinfo.bind(this)
    this.onChange1 = this.onChange1.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.getBlockChildren = this.getBlockChildren.bind(this)
  }

  onChange1 (e) {
    this.setState({nameinput: e.target.value})
  }
  onChange2(e) {
    this.setState({sys_title:e.target.value})
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

  componentWillMount () {

    this.getinfo()
  }

  getinfo () {
    axios.get('http://volunteer.andyhui.xin/notice/list')
      .then(res => {
        if (res.data.code === 3001) {
          const data = (res.data.noticeList || []).map((item, index) => {
            return {
              key: index,
              sys_content: item.sys_content,
              sys_id: item.sys_id,
              user_name: item.user_name
            }
          })
          this.setState({data: data})
          console.log(res.data)

        }
      })
  }

  handleButtonClick (e) {
    message.info('Click on left button.')
    console.log('click left button', e)
  }

  handleMenuClick (e) {
    message.info('Click on menu item.')
    console.log('click', e)
  }

  handleSubmit (e) {
    const config = {
      method: 'post',
      url: 'http://volunteer.andyhui.xin/notice',
      headers: {'Content-Type': 'application/json', 'token': localStorage.token},
      data: {
        sys_content: this.state.nameinput,
        sys_title: this.state.sys_title,
        sys_level: 1,
      }
    }
    axios(config).then(res => {
      console.log(res.data.code)
    })
  }

  render () {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1(优先级最高)</Menu.Item>
        <Menu.Item key="2">2(优先级居中)</Menu.Item>
        <Menu.Item key="3">3(优先级最低)</Menu.Item>
      </Menu>
    )

    const childrenData = [{
      tag: {tag: '公告信息'},
      // img: <img width="10%" src="https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png" />,
      text: `
      <div class="first-title">
        <div class='second'>
        当前公告
        </div>
        <div class="annonuce-content">
        XXXXXXXXXXX
        </div>
        <div class="announcement">
        &nbsp;&nbsp;历史公告信息
          `,
      edit: <Table bordered dataSource={this.state.data} columns={this.columns} />,

      // button:<EditableTable />,
    },
      {
        tag: {tag: '公告创建'},
        // img: <img width="100%" src="https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png" />,
        text: `
            <div class="ii">     
            </div>          
            `,
        // preior:
        //   <Dropdown overlay={menu}>
        //     <Button style={{ marginLeft: 8 }}>
        //       公告优先级 <Icon type="down" />
        //     </Button>
        //   </Dropdown>,
        title: <Input placeholder="公告标题"
                      value= {this.state.sys_title}
                      onChange={value => this.onChange2(value)}/>,
        edit: <TextArea className='form-content-input'
                        name='input'
                        ref='nameinput'
                        value={this.state.nameinput}
                        style={{width: 900, height: 400}}
                        placeholder="在此创建新公告"
                        onChange={value => this.onChange1(value)}
        />,

        submit: <Button onClick={this.handleSubmit}>创建并提交</Button>
      }
    ]
    const tabsChildren = childrenData.map(this.getBlockChildren)
    return (
      <div>
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />
          &nbsp; 公告信息
        </div>
        <Tabs key="tabs" onChange={this.onChange} activeKey={`${this.state.show}`}>
          {tabsChildren}
        </Tabs>
      </div>
    )
  }
}
