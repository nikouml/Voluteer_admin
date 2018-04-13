import React, {Component} from 'react'
import reactDom from 'react-dom'
import {message, DatePicker} from 'antd'
import moment from 'moment'
import axios from "axios/index";

const dateFormat = 'YYYY-MM-DD';
moment.locale('zh-cn',{
  months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin : '日_一_二_三_四_五_六'.split('_'),

})
const {RangePicker} = DatePicker;
const stateName = ['发布成功', '报名中', '报名结束活动未开始', '活动进行中', '活动结束']

class SearchDate extends Component {

  constructor() {
    super()

    this.state=({
      dateRange:[],
      Servers:[],
      pageTotal:1
    })
    this.onChangeConsoleDate=this.onChangeConsoleDate.bind(this)
  }

  onChangeConsoleDate(e){

    let dates=e.valueOf();
    this.setState({
      dateRange:[dates[0],dates[1]],
      Servers:[{
        key: 1,
        id: 1,
        name: "没有找到",
        time: "没有找到",
        state: 0,
        people_num:0,
        has_people_num:0,
        writer:"没有找到"
      }],
    })
    this.getServer()
  }

  componentWillMount(){

  }

  getServer(){

    let Url=this.props.Url
    let pageTotal=this.props.pageTotal,i=0,Ans=[]
    console.log("pageTotal: ",pageTotal)

    for(let k=0;k<pageTotal;k++){
      let url=Url,page=k+1
      url=url+'?page='+page
      axios.get(url)
        .then(res=>{
          if(res.data.code===2000){
            let vpListData = res.data.vpList.data
            for(let j=0;j<vpListData.length;j++){
              let vpData=vpListData[j]
              let joinData=vpData.start_at
              joinData=joinData.substr(0,10)

              let Start=this.state.dateRange[0]
              Start=Start.calendar(null,{
                sameElse:"YYYY-MM-DD",
                sameDay: 'YYYY-MM-DD',
                nextDay: 'YYYY-MM-DD',
                nextWeek: 'YYYY-MM-DD',
                lastDay: 'YYYY-MM-DD',
                lastWeek: 'YYYY-MM-DD'})

              let End=this.state.dateRange[1]
              End=End.calendar(null,{
                sameElse:"YYYY-MM-DD",
                sameDay: 'YYYY-MM-DD',
                nextDay: 'YYYY-MM-DD',
                nextWeek: 'YYYY-MM-DD',
                lastDay: 'YYYY-MM-DD',
                lastWeek: 'YYYY-MM-DD'})



              let State
              if (vpData.apply_status === 0) {
                if (vpData.apply_res === 0) {
                  State = '未审核'
                }
              } else if (vpData.apply_status === 1) {
                if (vpData.apply_res === 0) {
                  State = '已拒绝'
                } else {
                  State = stateName[vpData.status]
                }
              }

              if(moment(joinData).isBetween(Start,End)){
                i=1
                Ans.push({
                  key: vpData.id,
                  id: vpData.id,
                  name: vpData.title,
                  time: vpData.start_at,
                  state: State,
                  people_num:vpData.people_num,
                  has_people_num:vpData.has_people_num,
                  writer:vpData.user_name
                })
              }
            }
          }
        })
        .then(()=>{
          console.log("await")

          if(i){
            this.props.handleSearchDate(Ans)
            console.log(Ans)
          }else {
            this.props.handleSearchDate([{
              key: 1,
              id: 1,
              name: "没有找到",
              time: "没有找到",
              state: 0,
              people_num:0,
              has_people_num:0,
              writer:"没有找到"
            }])
          }

        })
    }





  }


  render() {
    return (

      <div>
        <RangePicker
          defaultValue={[moment('2018-04-01', dateFormat), moment('2018-05-01', dateFormat)]}
          format={dateFormat}
          onChange={this.onChangeConsoleDate}
        />

        <br/><br/><br/><br/><br/>
      </div>


    )
  }
}

export default SearchDate
