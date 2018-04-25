import React from 'react'
import { Form, Button, Input, Icon, message } from 'antd'
import axios from 'axios'
import './index.less'

const FormItem = Form.Item

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submitted: false
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true})
        axios.post(`http://volunteer.andyhui.xin/user/login`, {
          mobile: values.mobile,
          password: values.password
        }).then(res => {
          localStorage.setItem('datetime', new Date().toLocaleTimeString())
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_id', res.data.user_id)
          this.setState({loading: false})
          if (res.data.code === 1000) {
            axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
            axios.get(`http://volunteer.andyhui.xin/adminInfo/`)
              .then(res => {
                if (res.data.code === 1013) {
                  message.error('非管理员用户')
                } else {
                  message.success('登录成功')
                  this.props.history.push('/home')
                }
              })
          } else if (res.data.code === 1005) {
            message.error('密码错误')
          } else if (res.data.code === 1003) {
            message.error('用户不存在')
          } else {
            message.error('表单验证失败')
          }
        }).catch(err => {
          this.setState({loading: false})
          throw (new Error(err.message))
        })
      }
    })
  }

  handleReset (e) {
    e.preventDefault()
    this.props.form.resetFields()
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <div className='content'>
        <div className='main-content'>
          <img src="http://p53vmqr8d.bkt.clouddn.com/login_logo.png" alt="" width='150' height='150'
               style={{marginLeft: 120}} />
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{required: true, message: '请输入账号'}],
              })(
                <Input className='login-form-input1' prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                       placeholder="  请输入账号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
              })(
                <Input className='login-form-input2' prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                       type="password" placeholder="  请输入密码" />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
              登录
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleReset}>
              重置
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)