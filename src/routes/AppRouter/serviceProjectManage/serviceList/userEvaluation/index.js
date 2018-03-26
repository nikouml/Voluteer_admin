import React,{Component} from 'react'

import {Icon,Avatar,Rate} from 'antd'



export default  class UserJudge extends Component{
  constructor()
  {
    super()

  }

  render(){

    return(
      <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <span>{this.props.writer}</span>
          <Rate allowHalf defaultValue={2.5} style={{marginLeft:500}}/>
          <span style={{fontSize:10}}>{this.props.date}</span>
          <div style={{marginLeft:80}}>
            {this.props.content}
          </div>
      </div>
    )
  }

}
