import React from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Input, Button,Icon } from 'antd'
import axios from 'axios'
import { welfare } from '../../../routerForm/app'
const {TextArea} = Input

export default class helpcontrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true,
      faqInfo:{
        release: ' ',
        check: ' ',
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
  componentWillMount(){
    // this.getFAQ()
  }

  getFAQ(){
    axios.get('http://volunteer.andyhui.xin/faq')
      .then(res =>{
        console.log(res.data)
        const faqInfo ={

        release:res.data.faqInfo.release,
        // check:res.data.faqInfo.check-in,
        welfare:res.data.faqInfo.welfare,
        faq:res.data.faqInfo.faq,
        contact:res.data.faqInfo.contact
      }
        this.setState({faqInfo: faqInfo})
        console.log(res.data.code)

      }
  )
  }
  handleSubmit(e){

  }
  render () {
    return (
      <div>
        <div className="front-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />
          &nbsp;&nbsp;
          帮助中心
        </div> <Button onClick={this.handleedit.bind(this)}>修改</Button>
          <div className="help-title">关于发布</div>
        <div className="help-content">
           <TextArea className='form-content-input'
                     style={{width:900,height:400}}
                     placeholder="现实之前的历史公告"
                     disabled={this.state.disabled} />
        </div>
          <div className="help-title">关于签到</div>
        <div className="help-content">
         <TextArea className='form-content-input'
                   style={{width:900,height:400}}
                   placeholder="现实之前的历史公告"
                   disabled={this.state.disabled} />
        </div>

        <div className="help-title">关于参与</div>
        <div className="help-content">
      <TextArea className='form-content-input'
                style={{width:900,height:400}}
                placeholder="现实之前的历史公告"
                disabled={this.state.disabled} />
        </div>

        <div className="help-title">关于福利社</div>
        <div className="help-content">
           <TextArea className='form-content-input'
                     style={{width:900,height:400}}
                     placeholder="现实之前的历史公告"
                     disabled={this.state.disabled} />
        </div>

        <div className="help-title">常见问题</div>
        <div className="help-content">
           <TextArea className='form-content-input'
                     style={{width:900,height:400}}
                     placeholder="现实之前的历史公告"
                     disabled={this.state.disabled} />
        </div>

        <div className="help-title">联系方式</div>
        <div className="help-content">
           <TextArea className='form-content-input'
                     style={{width:900,height:400}}
                     placeholder="现实之前的历史公告"
                     disabled={this.state.disabled} />
        </div>


      </div>
    )
  }
}