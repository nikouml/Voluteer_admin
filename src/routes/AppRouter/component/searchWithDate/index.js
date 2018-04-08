import React, {Component} from 'react'
// import {Link} from 'dva/router'
// import './index.css'
import {Input, Menu, Dropdown, Button, Icon, message, Divider, DatePicker} from 'antd'
import moment from 'moment'
import axios from "axios/index";

const dateFormat = 'YYYY-MM-DD';


const APIDateFormate= "YYYY-MM-DD hh:mm:ss"


const {RangePicker} = DatePicker;

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

    //http://momentjs.cn/docs/#/displaying/calendar-time/ 文档
    let dates=e.valueOf();
    // console.log(dates)
    // let date1=moment("2018-04-26 12:09:47","YYYY-MM-DD hh:mm:ss")
    // console.log(date1.calendar())
    this.setState({
      dateRange:[dates[0],dates[1]]
    })
    // this.props.handleSearchDate(dates)
    this.getServer()
  }

  getServer(){

    let Url=this.props.Url
    axios.get(Url)
    // axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
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

            console.log(joinData,"1")
            console.log(Start,"2")
            console.log(End,"3")


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
            console.log("Ans: ",Ans)
            Servers=Ans

            this.props.handleSearchDate(Servers)
            console.log(Servers)
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
