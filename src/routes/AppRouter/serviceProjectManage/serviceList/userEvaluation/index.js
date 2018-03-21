import React,{Component} from 'react'

import {Icon,Avatar,Rate} from 'antd'

const titleStyle={fontSize:35,fontWeight:'bold',marginLeft:50}
const SecondtitleStyle={fontSize:25,fontWeight:'bold',marginLeft:50}

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
