import React, { Component } from 'react'
import { Icon, Button, message } from 'antd'
import axios from 'axios/index'

export default class ActivityUnpass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: {
        title: '',
        join_start_at: '',
        start_at: '',
        end_at: '',
        service_length: '',
        position_name: '',
        has_people_num: '',
        content: '',
        user_name: '',
        status:'',
      },

      disabled:false,

      loading:false
    }
    this.getServer = this.getServer.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
    this.handlSubmit2 = this.handlSubmit2.bind(this)
    }


    componentWillMount()
    {
      console.log(this.props.match)
      this.getServer()
    }

    getServer()
    {
      axios.get(`http://volunteer.andyhui.xin/vps/${this.props.match.params.id}`)
        .then(res => {
          console.log('123')
          console.log(res.data.vpInfo)
          const dataSource= {
            title: res.data.vpInfo.title,
            join_start_at: res.data.vpInfo.join_start_at,
            start_at: res.data.vpInfo.start_at,
            end_at: res.data.vpInfo.end_at,
            service_length: res.data.vpInfo.service_length,
            position_name: res.data.vpInfo.position_name,
            has_people_num: res.data.vpInfo.has_people_num,
            content: res.data.vpInfo.content,
            user_name: res.data.vpInfo.user_name,
            status: res.data.vpInfo.status

          }
          this.setState({dataSource:dataSource})
        })
    }

    handlSubmit(){
      this.setState({dataSource: {...this.state.dataSource, status: 1}}, () => {
        console.log(this.state)
      },)
      this.setState({loading:true,disabled:true})
      message.success("审核成功")
    }
    handlSubmit2(){
    this.setState({dataSource: {...this.state.dataSource, status: 1}},{loading: true},{disabled: true})
      message.success("审核成功")

    }

    render()
    {
      return (
        <div>
          <div>
            <Icon type="caret-right" /> <span className="firstTitle">需求服务信息详情</span> <br /> <br />
            <br /> <span>项目名称：{this.state.dataSource.title}</span>
            <br /> <span>报名时间：{this.state.dataSource.join_start_at}</span>
            <br /> <span>活动开始：{this.state.dataSource.start_at}</span>
            <br /> <span>活动结束：{this.state.dataSource.end_at}</span>
            <br /> <span>服务时长：{this.state.dataSource.service_length}小时</span>
            <br /> <span>活动地点：{this.state.dataSource.position_name}</span>
            <br /> <span>报名人数：{this.state.dataSource.has_people_num}</span>
            <br /> <span>描述说明：{this.state.dataSource.content}</span>
            <br /> <span>发起人：{this.state.dataSource.user_name}</span> <br /> <br /> <br />
          </div>
          {/*<div>*/}
          {/*<Icon type="caret-right" /><span className="firstTitle">影像库（视频或照片）</span>*/}
          {/*<br />*/}
          {/*<img src={require('../../../../../images/3.png')} width={200} height={200}*/}
          {/*style={{float: 'left', marginLeft: 300}} />*/}
          {/*<br />*/}
          {/*<img src={require('../../../../../images/4.png')} width={200} height={200}*/}
          {/*style={{float: 'left', marginLeft: 100}} />*/}

          {/*<br /> <br /> <br />*/}
          {/*</div>*/}
          <div style={{marginTop: 100}}>
            <Button onClick={this.handlSubmit}
                    className="shenghe"
                    icon="check"
                    type="primary"
                    size={'large'}
                    loading={this.state.loading}
                    disabled={this.state.submitted}
                    style={{marginLeft: 300}}>
              {this.state.disabled ? '审核成功' : '通过审核'}
            </Button>
            <Button onClick={this.handlSubmit2}
                    className="shenghe"
                    icon="close"
                    type="primary"
                    loading={this.state.loading}
                    disabled={this.state.submitted}
                    size={'large'}
                    style={{marginLeft: 100}}>
              {this.state.disabled ? '审核成功' : '拒绝审核'}
            </Button>
          </div>
        </div>
      )
    }
  }
