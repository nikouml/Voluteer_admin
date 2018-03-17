import React from 'react'
import {withRouter} from 'dva/router'
import path from 'routerForm'

export default function (WrappedComponent) {
  WrappedComponent = withRouter(WrappedComponent)
  class RouterPush extends React.Component {
    routerPush (name, options) {
      return this.props.history.push(path(name, options))
    }
    render () {
      return (
        <WrappedComponent {...this.props} routerPush={this.routerPush.bind(this)} />
      )
    }
  }
  return withRouter(RouterPush)
}
