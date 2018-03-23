import React from 'react'
import 'antd/dist/antd.css'
import { Input, Button,Icon} from 'antd'
import './index.css'

const {TextArea} = Input

export default class incontrol extends React.Component {
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
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />
          &nbsp; 公告信息
          <div className="edit-option">
          <Button onClick={this.handleedit.bind(this)}>修改</Button>
          <Button onClick={this.handleSubmit.bind(this)}>保存</Button>
          </div>
        </div>
        <div className='edit-content'>
           <TextArea className='form-content-input'
                     style={{width:900,height:400}}
                     placeholder="现实之前的历史公告"
                     disabled={this.state.disabled} />
        </div>
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} />

          &nbsp;&nbsp;历史公告信息
          <div className="annonuce-content">
            <div className="annonuce-past">
            1.XXXXXXX
            </div>
            <br />
              <div className="annonuce-past">
            2.XXXXXX
              </div>
            <br />
            <div className="annonuce-past">
            3.XXXX
            </div>
          </div>
        </div>
      </div>
    )
  }
}
