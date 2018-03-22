import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import { Input } from 'antd'
import { namesMap } from 'routerForm'
import ReactEcharts from 'echarts-for-react'
import './index.css'

@routerPush
@immutableRenderDecorator
export default class HomePage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  getOption = () => ({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  })
  getOption2 = () => ({
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  getOption3 = () => {
    return {
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    }
  }
  onChartClick = (param, echarts) => {
    console.log(param, echarts)
    alert('chart click')
    this.setState({
      cnt: this.state.cnt + 1,
    })
  }

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart)
    alert('chart legendselectchanged')
  }

  onChartReady = (echarts) => {
    console.log('echart is ready', echarts)
  }

  render () {

    return (
      <div>
        <div className="first-title">
          > 系统消息
        </div>
        <div className="page-content"> 通知公告<Input placeholder="value" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>

        <div className="first-title">
          > 服务网点概况
        </div>
        <div className="map-show">
          百度地图调用
        </div>
        <div className="depart-server">
          <div className="first-title">
            > 项目服务概况
            <div>
              <div className="zuoshang">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%',float:'left'}}
                  className='react_for_echarts' />

              </div>
              <div className="youshang">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%',float:'left'}}
                  className='react_for_echarts' />
              </div>
              <div className="zuoxia">
                <ReactEcharts
                  option={this.getOption()}
                  style={{height: '400px', width: '30%', float: 'left',clear:'both'}}
                  opts={{renderer: 'svg'}}
                  className='react_for_echarts' />
              </div>
              <div className="youxia">
                <ReactEcharts
                  option={this.getOption2()}
                  style={{height: 300, width: '50%', float: 'right'}}
                  onChartReady={this.onChartReady}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="first-title" style={{clear: 'both'}}>
          > 风云榜
        </div>
        <div className="echarts-showlist">
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '30%', float: 'left', clear: 'both'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '30%', float: 'left'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '28%', float: 'left'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
        </div>
      </div>

    )
  }
}
