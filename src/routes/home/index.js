import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import {fromJS} from 'immutable'
import {namesMap} from 'routerForm'
import './index.css'
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
@routerPush
@immutableRenderDecorator
@Form.create()

export default class HomePage extends PureComponent {
  state = {
    expand: false,
  };

  constructor (props) {
    super(props)

    this.state = {
      count: fromJS({
        value: 0

      })
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  // To generate mock Form.Item
  getFields () {
    const count = this.state.expand ? 10 : 6;
    const {getFieldDecorator} = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

//
//   map{
//     const themap = new.Bmap("tontainer")
//     const point = new.BMap.Point(116.404,39.915);
//      map.enableScrollWheelZoom(true);
// }
  render () {
    return (
      <div className = "whole">
        <div className= "first-title">
          > 系统消息
          <div className= "form-information">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row gutter={24}>{this.getFields()}</Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">更新</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                  <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                    更多 <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <br />
        <div className= "first-title">
          > 服务点概况
          <div className= "map-show">
            百度地图的api调用
              <br />
            项目服务概况（图表库引用）
          </div>
        </div>
        <br />
        <div className= "first-title">
          > 风云榜
          图表引用(echarts
          npm install echarts --save
          http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts

          )
        </div>


      </div>
    )
  }
}
