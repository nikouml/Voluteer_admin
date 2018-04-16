import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import Homepage from './home'
import NotFound from './404'
import fuligood from './inforcontrol/welfare/index'
import dynamic from 'dva/dynamic'
import ordercon from './inforcontrol/welfare/order'
import incontrol from './inforcontrol/publicinfor'
import Layout from 'components/Layout'
import path, { namesMap } from 'routerForm'
import Login from 'components/AdminLogin/AdminLogin'
import Employer from 'components/EmployerAdmin/EmployerAdmin'
import Department from 'components/DepartmentAdmin/DepartmentAdmin'
import User from 'components/UserAdmin/UserAdmin'
import Role from 'components/RoleAdmin/RoleAdmin'
import Log from 'components/LogSearch/LogSearch'
import Info from 'components/Information/information'
import showactive from './inforcontrol/showlist'
import helpcontrl from './inforcontrol/helpcenter'
import persinfor from './inforcontrol/asyncDemo/person'
import ServiceList from './AppRouter/serviceProjectManage/serviceList/index'
import ServiceUnpaaList from './AppRouter/serviceProjectManage/serviceUnpassList/index'
import Activity from './AppRouter/serviceProjectManage/serviceList/activities/index'
import ActivityUnpass from './AppRouter/serviceProjectManage/serviceUnpassList/activitisUnpass/index'
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import axios from 'axios'

const {HomePage, AsyncPage, Page404, welfare, icontrol, helpc, show, order, personc, servicelist, serviceunpasslist, activity, unpass} = namesMap


function requireAuthentication(Component) {
  // 组件有已登陆的模块 直接返回 (防止从新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent
  }
class AuthenticatedComponent extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  state = {
    login: true,
  }

  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth();
  }

  checkAuth() {

    // 判断登陆
    const token  = this.props.token;
    const login = token ? token.login : null;


    // 未登陆重定向到登陆页面
    if (!login) {
      let redirect = this.props.location.pathname + this.props.location.search;
      this.context.router.push('/login?message=401&redirect_uri=' + encodeURIComponent(redirect));
      return;
    }

    this.setState({login});
  }

  render() {
    if (this.state.login) {
      return <Component {...this.props}/>
    }
    return ''
  }
}

// 不使用 react-redux 的话直接返回
// Component.AuthenticatedComponent = AuthenticatedComponent
// return Component.AuthenticatedComponent


function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
Component.AuthenticatedComponent = connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
return Component.AuthenticatedComponent
}
class APP extends React.Component {

  render () {
    const AsyncDemo = dynamic({component: () => System.import('./inforcontrol/asyncDemo')})

    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Layout>
          <Route path='/home' component={Homepage} />
          {/*<Route path={path(HomePage)} component={Homepage} />*/}
          <Route path={path(AsyncPage)} component={AsyncDemo} />
          <Route path='/employer' component={Employer} />
          <Route path='/department' component={Department} />
          <Route path='/user' component={User} />
          <Route path='/role' component={Role} />
          <Route path='/log' component={Log} />
          <Route path='/info' component={Info} />
          <Route path={path(welfare)} component={fuligood} />
          <Route path={path(order)} component={ordercon} />
          <Route path={path(icontrol)} component={incontrol} />
          <Route path={path(show)} component={showactive} />
          <Route path={path(helpc)} component={helpcontrl} />
          <Route path={path(personc)} component={persinfor} />
          <Route path={path(Page404)} component={NotFound} />
          <Route path={path(servicelist)} component={ServiceList} />
          <Route path={path(serviceunpasslist)} component={ServiceUnpaaList} />
          <Route path={path(activity)} component={Activity} />
          <Route path={path(unpass)} component={ActivityUnpass} />
          {/*<Redirect from='*' to='/404' />*/}
        </Layout>
      </Switch>
    )
  }

}

//
// const App = (props) => {
//   return (
//
//   )
// }

export default withRouter(APP)
