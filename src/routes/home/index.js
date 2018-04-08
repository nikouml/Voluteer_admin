import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import { Input, Icon } from 'antd'
import { namesMap } from 'routerForm'
import ReactEcharts from 'echarts-for-react'
// import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
import {Map, NavigationControl, MapTypeControl,Marker, MarkerList} from 'react-bmap'
import BMap from 'BMap'
import './index.css'

const map = new BMap.Map("allmap"); // 创建Map实例
const citylist = [

  {"text":"仓山市政府","location":"13278304.425295064,2986752.515262309","count":2},
  {"text":"仓山2","location":"13278304.425295180,2986752.515262310","count":3},
  {"text":"仓山3","location":"13278304.425295069,2986752.515262309","count":5},
  {"text":"仓山4","location":"13278304.425295064,2986752.515262309","count":2},
  {"text":"仓山5","location":"13278304.425295064,2986752.515262309","count":2}
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
  componentDidMount(){
    const map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(119.279814,26.053599), 16); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.addControl(new BMap.NavigationControl());
    map.setCurrentCity("仓山市"); // 设置地图显示的城市 此项是必须设置的
    const point = new BMap.Point(119.279814,26.053599); // 之后将从后端获取经纬度
    const point2 =new BMap.Point(119.268684,26.053724);
    const marker = new BMap.Marker(point);        // 创建标注
    const marker2 =new BMap.Marker(point2);
    map.addOverlay(marker);
    map.addOverlay(marker2);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    function SquareOverlay(center, length, color){
      this._center = center;
      this._length = length;
      this._color = color;
    }
// 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();
    SquareOverlay.prototype.initialize = function(map){
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      const div = document.createElement("div");
      div.style.position = "absolute";
      // 可以根据参数设置元素外观
      div.style.width = this._length + "px";
      div.style.height = this._length + "px";
      div.style.background = this._color;
      // 将div添加到覆盖物容器中
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
      // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
      return div;
    }
    SquareOverlay.prototype.draw = function(){
// 根据地理坐标转换为像素坐标，并设置给容器
      var position = this._map.pointToOverlayPixel(this._center);
      this._div.style.left = position.x - this._length / 2 + "px";
      this._div.style.top = position.y - this._length / 2 + "px";
    }
    SquareOverlay.prototype.show = function(){
      if (this._div){
        this._div.style.display = "";
      }
    }
// 实现隐藏方法
    SquareOverlay.prototype.hide = function(){
      if (this._div){
        this._div.style.display = "none";
      }
    }
    const mySquare = new SquareOverlay(map.getCenter(), 10, "red");
    map.addEventListener("click", function(e){
      const markerpoint =new BMap.Marker(e.point.lng + ", " + e.point.lat);
        map.addOverlay(markerpoint);
      }
    );
    map.addOverlay(mySquare);
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
        <div id="allmap"
             style={{
               width:'100vw',
               height:'75vh'
             }} >



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
