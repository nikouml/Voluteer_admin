import React, {Component} from 'react'
import {Icon, Button, message} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios/index'

class ActivityUnpass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: {
        title: '',
        status:'',
        join_start_at: '',
        start_at: '',
        end_at: '',
        service_length: '',
        join_end_at:'',
        position_name: '',
        people_num:'',
        has_people_num: '',
        content: '',
        user_name: '',
        apply_res:'',
        apply_status:'',
      },
      loading:false,
      disabled:false
    }
    this.getServer = this.getServer.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
    this.handlSubmit2 = this.handlSubmit2.bind(this)
  }

  componentWillMount() {
    console.log(this.props.match)
    this.getServer()
  }

  componentWillUnmount() {
    this.getServer = false
  }

  getServer() {
    axios.get(`http://volunteer.andyhui.xin/vps/${this.props.match.params.id}`)
      .then(res => {
               const dataSource = {
          title: res.data.vpInfo.title,
          join_start_at: res.data.vpInfo.join_start_at,
          start_at: res.data.vpInfo.start_at,
          end_at: res.data.vpInfo.end_at,
          service_length: res.data.vpInfo.service_length,
          position_name: res.data.vpInfo.position_name,
          has_people_num: res.data.vpInfo.has_people_num,
          content: res.data.vpInfo.content,
          status:res.data.vpInfo.status,
          user_name: res.data.vpInfo.user_name,
          join_end_at:res.data.vpInfo.join_end_at,
          people_num:res.data.vpInfo.people_num,
          position_cdn:res.data.vpInfo.position_cdn,
          apply_status: res.data.vpInfo.apply_status,
          apply_res: res.data.vpInfo.apply_res,

        }
        this.setState({dataSource: dataSource})
      })
  }

  handlSubmit2(){
    message.success("拒绝审批成功")
    this.props.history.push('/serviceunpasslist')
  }


  handlSubmit() {

    const ID=this.props.match.params.id
    const URL='http://volunteer.andyhui.xin/vps/'+ID
    const token=localStorage.token
    const config={
      method:'post',
      url:URL,
      headers:{"Content-Type":"application/json","token":token},
      data:{
        title:this.state.dataSource.title,
        content:this.state.dataSource.content,
        position_name:this.state.dataSource.position_name,
        position_cdn:'100,100',
        join_start_at:this.state.dataSource.join_start_at,
        join_end_at:this.state.dataSource.join_end_at,
        start_at:this.state.dataSource.start_at,
        end_at:this.state.dataSource.end_at,
        people_num:this.state.dataSource.people_num,
        status:this.state.dataSource.status,
        type:'义务劳动,献爱心',
        main_picture:'23',
        apply_res:'1',
        apply_status:'1'
      }
    }
      axios(config)
        .then((res) => {
            if(res.data.code === 2000){
              message.success("审核成功")
              this.setState({loadingL:true,disabled:true})
              this.props.history.push('/serviceunpasslist')
            }else{
              console.log(res.data.code)
              message.error("审核失败")
            }
        })
        .catch(function (err) {
          console.log(err)
        })
    }


  render() {
    return (
      <div>
        <div>
          <Icon type="caret-right"/> <span className="firstTitle">需求服务信息详情</span> <br/> <br/>
          <br/> <span>项目名称：{this.state.dataSource.title}</span>
          <br/> <span>报名开始时间：{this.state.dataSource.join_start_at}</span>
          <br/> <span>报名截止时间：{this.state.dataSource.join_end_at}</span>
          <br/> <span>活动开始：{this.state.dataSource.start_at}</span>
          <br/> <span>活动结束：{this.state.dataSource.end_at}</span>
          <br/> <span>服务时长：{this.state.dataSource.service_length}小时</span>
          <br/> <span>活动地点：{this.state.dataSource.position_name}</span>
          <br/> <span>报名人数：{this.state.dataSource.has_people_num}</span>
          <br/> <span>需要人数：{this.state.dataSource.people_num}</span>
          <br/> <span>描述说明：{this.state.dataSource.content}</span>
          <br/> <span>发起人：{this.state.dataSource.user_name}</span> <br/> <br/> <br/>
        </div>
        <div>
        <Icon type="caret-right" /><span className="firstTitle">影像库（视频或照片）</span>
        <br />
        <img src={require('../../../../../images/3.png')} width={200} height={200}
        style={{float: 'left', marginLeft: 300}} />
        <br />
        <img src={require('../../../../../images/4.png')} width={200} height={200}
        style={{float: 'left', marginLeft: 100}} />

        <br /> <br /> <br />
        </div>
        <div style={{marginTop: 100}}>
          <Button type="primary"
                  size={'large'}
                  style={{marginLeft: 300}}
                  onClick={()=>{this.handlSubmit()}}
                  loading={this.state.loading}
                  disabled={this.state.disabled}
                  icon="check">
            {this.state.disabled?'审核成功':'通过审核'}
          </Button>
          <Button type="primary"
                  size={'large'}
                  style={{marginLeft: 100}}
                  icon="close"
                  loading={this.state.loading}
                  onClick={this.handlSubmit2}
                  disabled={this.state.disabled}
          >
            拒绝审批
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityUnpass)