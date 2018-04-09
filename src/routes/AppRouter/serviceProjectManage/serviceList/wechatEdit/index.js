import React,{Component} from 'react'
import {Icon,Button,DatePicker,Input} from 'antd'


class EditWechat extends Component{
  constructor(){
    super()
  }

  render(){
    const { TextArea } = Input;
    const titleStyle={fontSize:35,fontWeight:'bold',marginLeft:50}
    const SecondtitleStyle={fontSize:25,fontWeight:'bold',marginLeft:50}
    return(
      <div>
        <div>
          <Icon type="caret-right"/> <span style={titleStyle} >  微信消息编辑</span> <br/> <br/>
          <span>标题：</span><Input placeholder="请输入标题" style={{width:'500px'}}/>
          <br/><br/>
          <TextArea rows={6} placeholder="请输入内容" />
          <br/><br/>
          <span>添加附件：</span><Button type="primary"  >添加附件</Button>
          <br/><br/>
          <span>定时发送时间：</span> <DatePicker  placeholder={'请选择定时发送时间'}/>
          <br/><br/>
          <div style={{marginLeft:'500px'}}>
            <Button type="primary" >保存</Button>
          </div>

          <br/> <br/> <br/>
        </div>

        {/*<div>*/}
          {/*<Icon type="caret-right"/> <span style={titleStyle} >  评价</span> <br/> <br/>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default EditWechat
