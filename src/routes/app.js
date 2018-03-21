import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import Homepage from './home'
import NotFound from './404'
import fuligood from './inforcontrol/welfare/index'
import dynamic from 'dva/dynamic'
import ordercon from './inforcontrol/welfare/order'
import incontrol from './inforcontrol/publicinfor'
import Layout from 'components/Layout'
import path, {namesMap} from 'routerForm'
import showactive from './inforcontrol/showlist'
import helpcontrl from './inforcontrol/helpcenter'
import persinfor from './inforcontrol/asyncDemo/person'

const {HomePage, AsyncPage, Page404,welfare, icontrol, helpc, show, order, personc} = namesMap

const App = (props) => {
  const AsyncDemo = dynamic({component: () => System.import('./inforcontrol/asyncDemo')})
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path={path(HomePage)} component={Homepage} />
        <Route path={path(AsyncPage)} component={AsyncDemo} />
        <Route path={path(welfare)} component={fuligood} />
        <Route path={path(order)} component={ordercon} />
        <Route path={path(icontrol)} component={incontrol} />
        <Route path={path(show)} component={showactive} />
        <Route path={path(helpc)} component={helpcontrl} />
        <Route path={path(personc)} component={persinfor} />
        <Route path={path(Page404)} component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </Layout>
  )
}

export default App
