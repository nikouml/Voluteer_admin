import React, {Component} from 'react'
import {Link} from 'dva/router'
import {Button} from 'antd'
import './index.css'
import { withRouter } from 'dva/router'

class Choose extends Component {

  constructor (props) {
    super(props)
    this.state = {
    }
    this.handletoList = this.handletoList.bind(this)
    this.handletoUnpass = this.handletoUnpass.bind(this)
  }

  handletoList(){
    this.props.history.push('./servicelist')
  }
  handletoUnpass(){
    this.props.history.push('./serviceunpasslist')
  }

  render(){

    return (

      <div>
        <div className="choose">
          <Button onClick={this.handletolist} type='primary' className="list">志愿服务项目</Button>
          <Button onClick={this.handletoUnpass} type='primary' className="desire">待审核需求 </Button>
        </div>
        <br/>
      </div>


    )
  }
}

export default withRouter(Choose)
