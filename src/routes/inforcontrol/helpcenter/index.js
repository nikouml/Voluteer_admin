import React from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Input, Button, Icon, Col, Row } from 'antd'
import axios from 'axios'

// const {TextArea} = Input

export default class helpcontrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true,
      faqInfo: {
        release: ' ',
        checkin: ' ',
        welfare: ' ',
        faq: ' ',
        contact: ' ',
      }

    }
    this.handleedit = this.handleedit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFAQ = this.getFAQ.bind(this)
  }

  handleedit (e) {
    this.setState({disabled: false})
  }

  componentWillMount () {
    this.getFAQ()
  }

  getFAQ () {
    axios.get('http://volunteer.andyhui.xin/faq')
      .then(res => {
          console.log(res.data)
          const faqInfo = {
            release: res.data.faqInfo.release,
            checkin: res.data.faqInfo.checkin,
            welfare: res.data.faqInfo.welfare,
            faq: res.data.faqInfo.faq,
            contact: res.data.faqInfo.contact,
            attend: res.data.faqInfo.attend
          }
          this.setState({faqInfo: faqInfo})
          console.log(res.data)
        }
      )
  }

  handleSubmit (e) {

  }

  render () {
    return (
      <div>
        <div className="front-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />
          &nbsp;&nbsp;
          帮助中心
        </div>
        <div className="help-componet">
          <div className="help-second-title">
            关于发布
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.release}
          </div>
          <hr className= "hr0" />
        </div>
        <div className="help-componet">
          <div className="help-second-title">
            关于签到
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.checkin}
          </div>
          <hr className= "hr0" />
        </div>
        <div className="help-componet">
          <div className="help-second-title">
            关于福利社
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.welfare}
          </div>
          <hr className= "hr0" />
          <hr className= "hr0" />
        </div>
        <div className="help-componet">
          <div className="help-second-title">
            关于参与
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.attend}
          </div>
          <hr className= "hr0" />

        </div>
        <div className="help-componet">
          <div className="help-second-title">
            常见问题
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.faq}
          </div>
          <hr className= "hr0" />

        </div>
        <div className="help-componet">
          <div className="help-second-title">
            联系方式
          </div>
          <div className="helpcontent">
            {this.state.faqInfo.contact}
          </div>
        </div>
      </div>
    )
  }
}