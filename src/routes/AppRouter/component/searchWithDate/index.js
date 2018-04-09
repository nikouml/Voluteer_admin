import React, {Component} from 'react'
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
      Servers:[]
    })
    this.onChangeConsoleDate=this.onChangeConsoleDate.bind(this)
  }

  onChangeConsoleDate(e){

    let dates=e.valueOf();
    this.setState({
      dateRange:[dates[0],dates[1]]
    })
    this.getServer()
  }

  getServer(){

    let Url=this.props.Url
    axios.get(Url)
      .then(res => {
        if(res.data.code===2000){
          let i=0
          let Servers = (res.data.vpList.data || []).map((item, index) => {
            let joinData=item.start_at
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

            // console.log(joinData,"1")
            // console.log(Start,"2")
            // console.log(End,"3")


            if(moment(joinData).isBetween(Start,End)){
              i=1
              return {
                key: index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: item.status,
                people_num:item.people_num,
                has_people_num:item.has_people_num,
                writer:item.user_name
              }
            }

          })

          if(i){
            let Ans=[]
            for(let i=0;i<Servers.length;i++){
              if(typeof(Servers[i])==="undefined"){}
              else {
                Ans.push(Servers[i])
              }
            }
            // console.log("Ans: ",Ans)
            Servers=Ans

            this.props.handleSearchDate(Servers)
            // console.log(Servers)
            // this.setState({Servers: Servers})
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
        }else{
          message.error("请重新登录")
          this.props.history.push('/')

        }

      })
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
