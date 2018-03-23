import React from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Input, Button,Icon } from 'antd'
const {TextArea} = Input

export default class helpcontrl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: true

    }
    this.handleedit = this.handleedit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleedit (e) {
    this.setState({disabled: false})
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