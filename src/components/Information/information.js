import { Form, Input, Button } from 'antd';
const FormItem = Form.Item

class Info extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        }
      }
    }

    return (
      <div>
        <div style={{fontSize: 30}}>修改个人信息</div>
        <br />
        <div style={{fontSize: 20}}>带*为必填项</div>
        <hr />
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="登录名"
        >
          {getFieldDecorator('username', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入你的登录名',
            }],
          })(
            <Input style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='旧登录密码'
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='新登录密码'
        >
          {getFieldDecorator('newPassword', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input placeholder='用户密码必须同时包含字母数字并且是6-20位' type="password" style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="再次输入密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" style={{ width: '50%' }} onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{  message: 'Please input your phone number!' }],
          })(
            <Input  style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='电子邮箱'>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              message: 'Please input your E-mail!',
            }],
          })(
            <Input style={{ width: '50%' }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button style={{marginRight: 30, marginLeft: 10}} type="primary" htmlType="submit">修改</Button>
          <Button style={{marginRight: 30, marginLeft: 10}}  type="primary" htmlType="submit">重置</Button>
          <Button style={{marginRight: 30, marginLeft: 10}}  type="primary" htmlType="submit">返回首页</Button>
        </FormItem>
      </Form>
      </div>
    )
  }
}

export default Form.create()(Info)
