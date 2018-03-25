import { Menu, Dropdown, Button, Icon ,InputNumber,Table, Input, Popconfirm, Cascader, Col, Form, message, Radio, Row} from 'antd';
import React from 'react'
import './index.css'
import verfify from '../../../utils/Verify'
import { Link } from 'dva/router'
import path, {namesMap} from 'routerForm/index'
import { welfare } from '../../../routerForm/app'

const { order } = namesMap
const FormItem = Form.Item
const RadioGroup = Radio.Group
console.log(order)
function onChange(value) {
  // console.log('changed', value);
}

function handleButtonClick(e) {
  // message.info('Click on left button.');
  // console.log('click left button', e);
}

function handleMenuClick(e) {
  // message.info('Click on menu item.');
  // console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="option-1">全部商品</Menu.Item>
    <Menu.Item key="option-2">上架中</Menu.Item>
    <Menu.Item key="option-3">下架中</Menu.Item>
    <Menu.Item key="option-4">已告罄</Menu.Item>
  </Menu>
);
const operate =(
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="option-5">上架</Menu.Item>
    <Menu.Item key="option-6">下架</Menu.Item>
  </Menu>
);

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }}
               value={value}
               onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
@Form.create()
export default class fuligood extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'age'),
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'address'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>Edit</a>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  render () {
    const {getFieldDecorator, getFieldValue} = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
      },
    }
    return(
      <div>
        <div className="front-title" style={{height:60}}>
          <div className="index-title"><Link to={path(welfare)}>福利社管理</Link></div>
          <div className="index-title"><Link to={path(order)}>福利社订单管理</Link></div>
        </div>
        <div className= "option-colums">
          <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            全部商品
          </Dropdown.Button>
          <Dropdown overlay={operate}>
            <Button style={{ marginLeft: 8 }}>
              批量操作
              <Icon type="down" />
            </Button>
          </Dropdown>
          <InputNumber min={1} max={1000} defaultValue={20} onChange={onChange} />
          <Button type="primary">新增商品</Button>
        </div>
        <Table bordered dataSource={this.state.data} columns={this.columns} />;

        <div>
          <div className="index-title" style={{height:60}}> > 福利社管理   --产品新增</div>
            <Form>
              <FormItem
                label='商品名称'
                {...formItemLayout}
                key="form-content-good-name"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{

                  }, {
                    required: true, message: '请输入商品名称'
                  }]
                })(
                  <Input className='form-content-input'/>,
                )}
              </FormItem>
              <FormItem
                label='商品数量'
                {...formItemLayout}
                key="form-content-good-num"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{

                  }, {
                    required: true, message: '请输入商品数量'
                  }]
                })(
                  <Input className='form-content-input'/>,
                )}
              </FormItem>
              <FormItem
                label='商品赞助商'
                {...formItemLayout}
                key="form-content-good-zanzhu"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{

                  }, {
                    required: true, message: '请输入商品赞助商'
                  }]
                })(
                  <Input className='form-content-input'/>,
                )}
              </FormItem>
              <FormItem
                label='赞助商地址'
                {...formItemLayout}
                key="form-content-good-address"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{

                  }, {
                    required: true, message: '请输入赞助商地址'
                  }]
                })(
                  <Input className='form-content-input'/>,
                )}
              </FormItem>
              <FormItem
                label='赞助商联系人'
                {...formItemLayout}
                key="form-content-good-people"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{

                  }, {
                    required: true, message: '赞助商联系人'
                  }]
                })(
                  <Input className='form-content-input'/>,
                )}
              </FormItem>
              <FormItem
                label='上架时间'
                {...formItemLayout}
                key="form-content-good-time"
              >
                {getFieldDecorator('time', {
                  rules: [{required: true, message: '.'}],
                })(
                  <RadioGroup>
                    <Radio value='立即上架'>立即上架</Radio>
                    <Radio value='暂不上架'>暂不上架，放入仓库中</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                label='兑换条件'
                {...formItemLayout}
                key="form-content-good-way"
              >
                {getFieldDecorator('time', {
                  rules: [{required: true, message: '.'}],
                })(
                  <RadioGroup>
                    <Radio value='S'>星星10颗</Radio>
                    <Radio value='s'>服务时长累计10小时</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Form>
          <FormItem
            key="form-content-footer"
            // onSubmit={this.handleSubmit}
          >
            <Row gutter={12} type='flex'>
              <Col className='left-content' xs={{span: 24}} sm={{span: 12, offset: 6}}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='form-button-1'
                  // loading={this.state.loading}
                  // disabled={this.state.submitted}
                >
                  {/*{this.state.submitted ? '提交成功' : '点击提交'}*/}
                  保存
                </Button>
                <Button
                  type="ghost"
                  // onClick={this.handleReset}
                  className='form-button-2'
                  style={{marginLeft: 20}}
                >
                  重置
                </Button>
              </Col>
            </Row>
          </FormItem>
        </div>
      </div>
    )
  }
}