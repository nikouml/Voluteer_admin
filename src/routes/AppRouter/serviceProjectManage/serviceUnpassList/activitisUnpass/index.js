import React, { Component } from 'react'
import { Icon, Button } from 'antd'

export default class ActivityUnpass extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handSubmit1 =this.handSubmit1.bind(this)
  }

  handSubmit1 (e) {
    e.preventDefault()

    const body = {
      vp_id: values.id,
      user_id: values.id
    }
    fetch('http://syb.andyhui.xin/apply/deal/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token
      },
      body: JSON.stringify(body)
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (json.code === 0) {
        message.success('insert success')
      } else {
        message.error('failed')
      }
    }).catch((e) => {
      console.log(e.message)
    })
  }

  handSumbit2(e){

      e.preventDefault()

      // const body = {
      //   vp_id: values.id,
      //   user_id: values.id
      // }
      fetch('http://syb.andyhui.xin/apply/deal/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.token
        },
        body: JSON.stringify(body)
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if (json.code === 0) {
          message.success('审核通过')
        } else {
          message.error('审核失败，请联系韩笑 ')
        }
      }).catch((e) => {
        console.log(e.message)
      })
  }


  render () {
    const titleStyle = {fontSize: 35, fontWeight: 'bold', marginLeft: 50}
    const SecondtitleStyle = {fontSize: 25, fontWeight: 'bold', marginLeft: 50}

    return (
      <div>
        <div>
          <Icon type="caret-right" /> <span className="firstTitle">需求服务信息详情</span> <br /> <br />
          <br /> <span>项目名称：敬老爱老</span>
          <br /> <span>报名时间：2018年2月1日至2018年2月10日</span>
          <br /> <span>活动时长：2018年2月13日9:00-12:00</span>
          <br /> <span>服务时长：3小时</span>
          <br /> <span>活动地点：福州市第二社会福利院</span>
          <br /> <span>报名人数：10人</span>
          <br /> <span>描述说明：到福利院开展"敬老爱老"活动</span>
          <br /> <span>发起人：晓明</span> <br /> <br /> <br />
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
          <Button type="primary" size={'large'} style={{marginLeft: 300}} onClick={this.handSumit1}>通过审核</Button>
          <Button type="primary" size={'large'} style={{marginLeft: 100}} onClick={this.handSumit2}>拒绝审批</Button>

        </div>
      </div>
    )
  }

}