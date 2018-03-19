import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import Homepage from './home'
import NotFound from './404'
import dynamic from 'dva/dynamic'
import Layout from 'components/Layout'
import path, {namesMap} from 'routerForm'
import fuligood from './informationc/fuli'
const {HomePage, AsyncPage, Page404,system,Fuli} = namesMap

const App = (props) => {
  const AsyncDemo = dynamic({component: () => System.import('./informationc/asyncDemo')})
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path={path(HomePage)} component={Homepage} />
        <Route path={path(AsyncPage)} component={AsyncDemo} />
        <Route path={path(Fuli)} component={fuligood}/>
        <Route path={path(system)} component={system} />
        <Route path={path(Page404)} component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </Layout>
  )
}

export default App
