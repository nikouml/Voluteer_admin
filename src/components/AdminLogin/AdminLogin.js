import React from 'react'
import { Form, Button, Input, Checkbox, Icon} from 'antd'
import './index.less'
import logo from 'images/login_logo.png'
import { Link } from 'dva/router'

const FormItem = Form.Item

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleReset = this.handleReset.bind(this)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  handleReset(e) {
    e.preventDefault()
    this.props.form.resetFields()
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className='content' >
        <div className='main-content'>
          <img  src={logo} alt="" width='150' height='150' style={{marginLeft: 120}}/>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入账号' }],
              })(
                <Input  className='login-form-input1' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="  请输入账号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input className='login-form-input2' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="  请输入密码" />
              )}
            </FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              重置
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)