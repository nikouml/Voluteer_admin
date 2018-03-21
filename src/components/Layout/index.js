/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const {Header, Content, Footer, Sider} = Layout
import 'antd/dist/antd.css'
import system from '../../routes/system'
import path, { namesMap } from 'routerForm/index'
import { Link } from 'dva/router'

const {HomePage, AsyncPage, HomePage2,Fuli} = namesMap
const SubMenu = Menu.SubMenu;
export default class LayoutContent extends React.Component {
    state = {
        collapsed: false,
    }
    onCollapse = (collapsed) => {
        console.log(collapsed)
        this.setState({collapsed})
    }

    render () {
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
                            <span className="nav-text"><Link to='/servicelist'>服务项目管理</Link></span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>信息管理</span></span>}
                        >
                            <Menu.Item key="3"><Link to={path(AsyncPage)}>群众及党员信息管理</Link></Menu.Item>
                            <Menu.Item key="4"><Link to={path(Fuli)}>福利社管理</Link></Menu.Item>
                            <Menu.Item key="5">公告信息管理</Menu.Item>
                            <Menu.Item key="6">帮助中心管理</Menu.Item>
                            <Menu.Item key="7">风采榜管理</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="pie-chart" /><span>系统管理</span></span>}
                        >
                            <Menu.Item key="8">单位管理</Menu.Item>
                            <Menu.Item key="9">部门管理</Menu.Item>
                            <Menu.Item key="10">用户管理</Menu.Item>
                            <Menu.Item key="11">角色管理</Menu.Item>
                            <Menu.Item key="12">日志查询</Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>

                <Layout style={{marginLeft: 200}}>
                    <Link to={path(HomePage)}>
                        <Header style={{background: '#fff', padding: 0, textAlign: 'center', fontSize: 20}}>
                            仓山志愿者后台管理
                        </Header>
                    </Link>
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
