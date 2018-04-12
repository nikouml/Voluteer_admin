import React,{Component} from 'react'

import {Avatar,Rate,Button,Icon} from 'antd'
import axios from "axios/index";



export default  class UserJudge extends Component{
  constructor()
  {
    super()
    this.state={

      data:[
        {
          user_id: 6,
          user_name: "6(Otto Ondricka)",
          user_avatar: "http://oz3rf0wt0.bkt.clouddn.com/18-1-22/15799237.jpg",
          comment_at: "2018-04-08 00:02:35",
          comment_content: "韩笑快改bug",
          publisher_reply: "orz"
        },
        {
          user_id: 1,
          user_name: "王鹏(Forrest McCullough III)",
          user_avatar: "http://andyhui.top/images/avatar.jpg",
          comment_at: "2018-04-07 23:59:36",
          comment_content: "韩笑改bug",
          publisher_reply: "QAQ"
        }
      ]
    }

  }

  componentWillMount() {
    this.getServer()
  }

  getServer(){
    // console.log(this.props.path)
    let URL='http://volunteer.andyhui.xin/comment/'+this.props.path
    axios.get(URL)
      .then(res=>{
        if(res.data.code===2000){
          let data=res.data.comment.data
          this.setState({
            data:data
          })
        }
      })
  }


  render(){

    let data=this.state.data
    let datas=[]
    for(let i=0;i<data.length;i++){
      let people=data[i]
      datas.push(<div key={i}>
        <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span style={{padding:10}}>{people.user_name}</span>
        </div>

        <Rate allowHalf defaultValue={2.5} style={{marginRight:100}}/>
        <span style={{fontSize:10}}>{people.comment_at}</span>
        <div style={{marginLeft:80}}>
          {people.comment_content}
        </div>
        <br/><br/><br/>
      </div>)
    }

    return(
      <div>
        <Icon type="caret-right"/> <span className="firstTitle" >  评价</span> <br/> <br/>

        <div style={{marginLeft:50}}>

          <Icon type="caret-right"/> <span className="secondTitle" > 志愿者评价</span> <br/> <br/>
          {datas}
        </div>


      </div>
    )
  }

}
