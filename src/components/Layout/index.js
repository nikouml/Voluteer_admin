/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Link } from 'dva/router'
import logo from 'images/logo.svg'
import './index.less'
import path, {namesMap} from 'routerForm/index'
const {HomePage, AsyncPage, HomePage2} = namesMap

const LayoutContent = (props) => (
  <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Welcome to React</h2>
    </div>

    <header className='App-nav'>
      <Link to={path(HomePage)}> home </Link>
      <Link to={path(AsyncPage, {params: {page: 'abc'}})}> async </Link>
      <Link to={path(HomePage2, {query: {a: [1, 2, 3]}})}> 404 </Link>
    </header>
    <div className='App-content'>
      {props.children}
    </div>
  </div>
)

export default LayoutContent
