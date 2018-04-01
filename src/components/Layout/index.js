/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Link } from 'dva/router'
import './index.less'
import { Layout, Menu, Icon, Button, message } from 'antd';
import 'antd/dist/antd.css'
import path, {namesMap} from 'routerForm/index'
import axios from 'axios'

const {HomePage, AsyncPage, welfare, icontrol, helpc, show, servicelist} = namesMap
const {Header, Content, Footer, Sider} = Layout
const SubMenu = Menu.SubMenu;

export default class LayoutContent extends React.Component {
  constructor (props)
  {
    super(props)
    this.state = {
      collapsed: false,
      name: '',
      avatar: '',
      roles: '',
      token: ''
    }
  }
  onCollapse = (collapsed) => {
    // console.log(collapsed)
    this.setState({collapsed})
  }

  componentWillMount () {
    axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
    axios.get(`http://volunteer.andyhui.xin/adminInfo/`)
      .then(res => {
        if (res.data.code === 1000) {
          console.log(res)
          this.setState({
            name: res.data.name,
            avatar: res.data.avatar,
            roles: res.data.roles
          })
        } else if (res.data.code === 1013) {
          message.error('非管理员用户')
        }
    })
  }

  render () {
    const {avatar, roles, name} = this.state
    return (
      <Layout>
        <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="desktop" />
              <span className="nav-text">
                  <Link to={path(HomePage)}>
                          信息概览
                  </Link>
                </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">
                <Link to={path(servicelist)}>
                         服务项目管理
                  </Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>信息管理</span></span>}
            >
              <Menu.Item key="3"><Link to={path(AsyncPage)}>群众及党员信息管理</Link></Menu.Item>
              <Menu.Item key="4"><Link to={path(welfare)}>福利社管理</Link></Menu.Item>
              <Menu.Item key="5"><Link to={path(icontrol)}>公告信息管理</Link></Menu.Item>
              <Menu.Item key="6"><Link to={path(helpc)}>帮助中心管理</Link></Menu.Item>
              <Menu.Item key="7"><Link to={path(show)}>风采榜管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="pie-chart" /><span>系统管理</span></span>}
            >
              <Menu.Item key="8"><Link to='/employer'>单位管理</Link></Menu.Item>
              <Menu.Item key="9"><Link to='/department'>部门管理</Link></Menu.Item>
              <Menu.Item key="10"><Link to='/user'>用户管理</Link></Menu.Item>
              <Menu.Item key="11"><Link to='/role'>角色管理</Link></Menu.Item>
              <Menu.Item key="12"><Link to='/log'>日志查询</Link></Menu.Item>
            </SubMenu>


          </Menu>
        </Sider>

        <Layout style={{marginLeft: 200}}>
          <Link to={path(HomePage)}>
            <Header style={{background: '#fff', padding: 5, fontSize: 30}}>
              仓山区党员志愿服务平台
            </Header>
          </Link>
          <div className='show'>
            <img className='icon' style={{width: 30, height: 30, marginRight: 20}} src={avatar}></img>
            <span>欢迎{name}用户{roles}</span>
            <a href="">个人设置</a>
            <Button>退出</Button>
          </div>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff'}}>
              {this.props.children}

            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            不洗碗工作室 ©2018 Created
          </Footer>
        </Layout>
      </Layout>

    )
  }
}
