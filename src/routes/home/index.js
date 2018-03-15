import React, { Component, PureComponent } from 'react'
import Item from './Item'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import {fromJS} from 'immutable'
import {namesMap} from 'routerForm'
const {HomePage2} = namesMap

@routerPush
@immutableRenderDecorator
export default class HomePage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      count: fromJS({
        value: 0
      })
    }
  }

  add = () => {
    this.setState({
      count: this.state.count.update('value', (value) => value + 1)
    })
    this.props.routerPush(HomePage2, {query: {a: [1, 2, 3]}})
  }

  render () {
    return (
      <div onClick={this.add}>
        edit 'src/routes/home/index.js' to start
        <Item count={this.state.count} />
      </div>
    )
  }
}
