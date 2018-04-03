import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import { Input, Icon } from 'antd'
import { namesMap } from 'routerForm'
import ReactEcharts from 'echarts-for-react'
// import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
import {Map, NavigationControl, MapTypeControl,Marker, MarkerList} from 'react-bmap'
import {simpleMapStyle} from './mapstyle'
import './index.css'

const citylist = [
  {"text":"济南","location":"13024668.93,4367677.68","count":3},
  {"text":"沈阳","location":"13741313.13,5104005.77","count":3},
  {"text":"北京","location":"12959238.56,4825347.47","count":3},
  {"text":"上海","location":"13523265.31,3641114.64","count":3},
  {"text":"重庆","location":"11862018.46,3427244.19","count":3},
  {"text":"温州","location":"13437062.10,3228868.44","count":3},
  {"text":"广州","location":"12609384.20,2631450.58","count":3},
  {"text":"成都","location":"11585280.82,3555907.48","count":3},
  {"text":"长沙","location":"12573153.72,3258106.27","count":3},
  {"text":"贵阳","location":"11870885.18,3060812.20","count":3},
  {"text":"杭州","location":"13376484.03,3517857.39","count":3},{"text":"石家庄","location":"12748538.99,4559724.44","count":3},{"text":"武汉","location":"12725273.29,3558757.28","count":3},{"text":"合肥","location":"13050732.25,3717865.48","count":3},{"text":"西安","location":"12127979.30,4051219.02","count":3},{"text":"嘉兴","location":"13443315.62,3578394.42","count":3},{"text":"青岛","location":"13401837.54,4285189.34","count":3},{"text":"南宁","location":"12064197.51,2593908.90","count":3},{"text":"福州","location":"13280886.83,2990092.74","count":2},{"text":"天津","location":"13047444.58,4707506.67","count":2},{"text":"汕头","location":"12989872.35,2658432.29","count":2},{"text":"昆明","location":"11448183.93,2843599.61","count":2},{"text":"南京","location":"13225221.26,3748918.53","count":2},{"text":"惠州","location":"12737687.42,2629176.06","count":2},{"text":"海口","location":"12268256.50,2264181.59","count":2},{"text":"郑州","location":"12649521.59,4105848.27","count":2},{"text":"深圳","location":"12697919.69,2560977.31","count":2},{"text":"金华","location":"13319970.32,3365439.56","count":2},{"text":"乌鲁木齐","location":"9754288.85,5409732.61","count":2},{"text":"佛山","location":"12593536.51,2618504.74","count":2},{"text":"无锡","location":"13393990.44,3674896.25","count":2},{"text":"徐州","location":"13057066.72,4032808.36","count":2},{"text":"东莞","location":"12663646.09,2618419.30","count":2},{"text":"呼和浩特","location":"12441036.70,4961658.65","count":2},{"text":"宁波","location":"13531775.58,3466675.15","count":2},{"text":"常州","location":"13356273.65,3716551.52","count":2},{"text":"洛阳","location":"12519129.85,4088448.61","count":2},{"text":"苏州","location":"13424120.33,3649961.01","count":2},{"text":"南昌","location":"12898120.55,3315255.29","count":2},{"text":"烟台","location":"13520391.89,4478567.99","count":2},{"text":"扬州","location":"13293818.84,3792807.67","count":2},{"text":"厦门","location":"13146520.15,2794850.59","count":2},{"text":"太原","location":"12529930.90,4535569.28","count":2},{"text":"潍坊","location":"13265880.80,4373425.72","count":2},{"text":"泉州","location":"13211798.77,2842902.63","count":2},{"text":"南通","location":"13458706.40,3738531.15","count":2}];

const markerData = [
  {
    text: "长沙大道",
    location: "113.22183,28.191712"
  },
  {
    text: "机场高速",
    location: "113.057565,28.175208"
  },
  {
    text: "梅溪湖隧道",
    location: "112.892215,28.176181"
  },
  {
    text: "长沙大道",
    location: "113.022513,28.175952"
  },
  {
    text: "机场高速",
    location: "113.217251,28.191288"
  },
  {
    text: "长张高速",
    location: "112.861765,28.239533"
  },
  {
    text: "浏阳河大桥",
    location: "113.118219,28.179502"
  },
  {
    text: "三环线",
    location: "113.184336,28.123098"
  },
  {
    text: "长张高速",
    location: "112.566241,28.329692"
  },
  {
    text: "长沙绕城高速",
    location: "113.184336,28.123098"
  }
];

let  markers = [
  {
    lng: 119.279498,
    lat:26.053751
  },
  {
    lng: 119.2611,
    lat: 26.068291
  },
  {
    lng: 119.2611,
    lat: 26.068291
  },
  {
    lng: 119.253627,
    lat: 26.044078
  },
  {
    lng: 119.25722,
    lat: 26.05018
  },
  {
    lng:119.272671,
    lat:26.056964
  },
];
const CustomControl = (props) => {
  let map = props.map;
  return <div onClick={()=>{map.setZoom(map.getZoom() + 1)}} style={{position: 'absolute', right: '10px', top: '10px',  color: 'white', background: 'blue'}}>放大2级</div>
}
@routerPush
@immutableRenderDecorator
export default class HomePage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }
  get options() {
    return ['anchor', 'offset', 'type', 'showZoomInfo', 'enableGeolocation'];
  }
  getControl() {
    return new BMap.NavigationControl(this.getOptions(this.options));
  }
  getOption = () => ({
    title: {
      text: '项目服务'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['总需求', '未完成', '进行中', '已完成']
    },
    yAxis: {},
    series: [{
      // name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10]
    }]
  })
  getOption2 = () => ({
    title: {
      text: '项目完成度',
      // subtext: '纯属虚构',
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
          {value: 335, name: '未完成的服务项目'},
          {value: 310, name: '正在进行中的服务项目'},
          {value: 234, name: '以完成的服务项目'}
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
        text: '新增志愿活动次数'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['邮件营销', '联盟广告', '视频广告']
      // },
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
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 系统消息
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
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 服务网点概况
        </div>
        <div className="map-show"  >
          {/*<Map center = {{*/}
            {/*lng: 119.279282,*/}
            {/*lat: 26.052323*/}
          {/*}}*/}
               {/*zoom = '16'*/}
               {/*// mapStyle={simpleMapStyle}*/}
          {/*>*/}
            {/*<Marker*/}
              {/*position={{lng: 119.279282, lat: 26.052323}}*/}
              {/*icon="simple_red"*/}
              {/*events={{*/}
                {/*click: () => {*/}
                  {/*console.log('marker click event');*/}
                {/*}*/}
              {/*}}*/}
            {/*/>*/}
            {/*<Marker position={{lng: 119.282875, lat: 26.052712}} icon="simple_blue" />*/}
            {/*<Marker position={{lng: 119.276336, lat: 26.049336}} icon="loc_blue" />*/}
            {/*<Marker position={{lng: 119.272455, lat: 26.057029}} icon="loc_red" />*/}
            {/*<Marker position={{lng: 119.286109, lat: 26.056153}} icon="start" />*/}
            {/*<Marker position={{lng: 119.277629, lat: 26.059398}} icon="end" />*/}
          {/*</Map>*/}
          {/*<Map center={{*/}
            {/*lng: 119.279282,*/}
            {/*lat: 26.052323*/}
          {/*}}*/}
               {/*zoom='16'*/}
               {/*mapStyle={simpleMapStyle}>*/}
            {/*<MarkerList*/}
              {/*data={citylist}*/}
              {/*fillStyle="#ff3333"*/}
              {/*coordType="bd09mc"*/}
              {/*animation={true}*/}
              {/*isShowShadow={false}*/}
              {/*multiple={true}*/}
              {/*autoViewport={false}*/}
            {/*/>*/}

          {/*</Map>*/}
          <Map center={{
            lng: 119.279282,
            lat: 26.052323
          }}
               zoom='5'
               mapStyle={simpleMapStyle}>
            <MarkerList
              data={citylist}
              fillStyle="#ff3333"
              coordType="bd09mc"
              animation={true}
              isShowShadow={false}
              multiple={true}
              autoViewport={false}
            />
          </Map>
          {/*<Map center={{*/}
            {/*lng: 119.279282,*/}
            {/*lat: 26.052323*/}
          {/*}}*/}
               {/*zoom='16'*/}
               {/*// mapStyle={simpleMapStyle}*/}
            {/*>*/}
            {/*<div style={{position: 'absolute', left: '10px', top: '10px',  color: 'white', background: 'blue'}}>自定义组件</div>*/}
            {/*<CustomControl />*/}
            {/*{markers.map((marker, index) => {*/}
              {/*var icon = "red" + (index + 1);*/}
              {/*return <Marker map={this.props.map} icon={icon} position={{lng: marker.lng, lat: marker.lat}} {...marker} key={index}/>*/}
            {/*})}*/}
            {/*<NavigationControl />*/}
            {/*/!*<MapTypeControl />*!/*/}
            {/*/!*<ScaleControl />*!/*/}
            {/*/!*<OverviewMapControl />*!/*/}
          {/*</Map>*/}

        </div>
        <div className="depart-server">
          <div className="first-title">
            <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 项目服务概况
            <div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%', float: 'left'}}
                  className='react_for_echarts' />

              </div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%', float: 'left'}}
                  className='react_for_echarts' />
              </div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption()}
                  style={{height: '400px', width: '30%', float: 'left'}}
                  opts={{renderer: 'svg'}}
                  className='react_for_echarts' />
              </div>
              <div className="four-part">
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
