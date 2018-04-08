import React,{Component} from 'react'
import {Button} from 'antd'
import Choose from '../../component/choose/index'
import Search from '../../component/searchWithDate/index'
import {Table, Icon, Divider,Dropdown,Menu,DatePicker,message} from 'antd';
import {Link} from 'dva/router'
import axios from 'axios/index'
import moment from 'moment'
// import 'moment/locale/'
moment.locale('zh-cn',{
  months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin : '日_一_二_三_四_五_六'.split('_'),

})

import {Input} from "antd/lib/index";
const dateFormat = 'YYYY-MM-DD';
const APIDateFormate= "YYYY-MM-DD hh:mm:ss"
const {RangePicker} = DatePicker;


const searchContent=['待审核','已审核'];
const menu = (
  <Menu >
    <Menu.Item key="1">审核通过</Menu.Item>
    <Menu.Item key="2">审核拒绝</Menu.Item>
  </Menu>
)

class ServiceUnpassList extends Component{
    constructor(props){
        super(props)
      this.state={
        Servers:[{
          key: '1',
          id:'1',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        },{
          key: '2',
          id:'2',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        },{
          key: '3',
          id:'3',
          name: '敬老爱老',
          time: '2015年3月21日',
          state: '待审核',
        }
        ],
        dateRange:[],
        keyWords:""

      }

      this.getServer = this.getServer.bind(this)
      this.onChangeDate=this.onChangeDate.bind(this)
      this.handleSearch=this.handleSearch.bind(this)
    }

  handleMenuClick(e) {
    message.info('暂时无法搜索.');
    console.log('click', e);
  }

  onChangeDate(e){

    //http://momentjs.cn/docs/#/displaying/calendar-time/ 文档
    let dates=e.valueOf()
    this.setState({
      dateRange:[dates[0],dates[1]]
    })
    // console.log("123")
    // console.log(this.state.dateRange)
    // let dateTest=moment("2018-04-26 12:09:47","YYYY-MM-DD hh:mm:ss")
    // console.log(dateTest.calendar())
    this.getServer("date")
  }


  componentWillMount()
  {
    // console.log(this.props)
    this.getServer()
  }

  handleSearch(e){

    let value=e.target.value

    // console.log(e.target.value)
    // this.setState({keyWords:value})
    this.getServer("keyWords",value)
  }

  getServer(order,string)
  {
    if(!order){
      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          const Servers = (res.data.vpList.data || []).map((item, index) => {
            return {
              key: index,
              id: item.id,
              name: item.title,
              time: item.start_at,
              state: (item.apply_status?'审核通过':'待审核'),
            }
          })
          this.setState({Servers: Servers})
          // console.log(res.data.vpList.data[0])
          // console.log(this.state.Servers)
        })
    }else if(order==="date"){

      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          let i=0;
          const Servers = (res.data.vpList.data || []).map((item, index) => {


            let joinData=item.start_at
            joinData=joinData.substr(0,10)


            let Start=this.state.dateRange[0]
            Start=Start.calendar(null,{sameElse:"YYYY-MM-DD"})

            let End=this.state.dateRange[1]
            End=End.calendar(null,{sameElse:"YYYY-MM-DD"})

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
              }
            }else{}
          })
          if(i){
            this.setState({Servers: Servers})
          }else {
            this.setState({Servers:[{
                key: 1,
                id:1,
                name: '没有找到',
                time: '没有找到',
                state: '没有找到',
              }]})
          }
          // console.log(res.data.vpList.data[0])
          console.log(localStorage.token)
          // console.log(this.state.Servers)
        })

    }else if(order==="statufs"){

    }else if(order==="keyWords"){
      let keyWords=string
      console.log("keywords: ",keyWords)
      let i=0
      axios.get(`http://volunteer.andyhui.xin/vps/list/0`)
        .then(res => {
          let Servers = (res.data.vpList.data || []).map((item, index) => {

           let  str=new RegExp(keyWords)

            console.log(item.title,"and",str)
            if(str.test(item.title)){
              i=1
              return {
                key: index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: item.status,
              }
            }else {}

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

            this.setState({Servers:Servers})
            // console.log(Servers)
          }else {
            this.setState({Servers:[{
                key: 1,
                id:1,
                name: '没有找到',
                time: '没有找到',
                state: '没有找到',
              }]})
          }
          // console.log(res.data.vpList.data[0])
          console.log(localStorage.token)
          // console.log(this.state.Servers)
        })

    }

  }
    render(){
      const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '活动名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '发布时间',
          dataIndex: 'time',
          key: 'time',
        }, {
          title: '审核状态',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            // console.log('a', record)
            // console.log('b',text)
            return  (
              <span>
      {/*<a href="#">{record.name}</a>*/}
              <Divider type="vertical" />
              <Link to={`/unpass/${record.id}`} className="ant-dropdown-link">
        详情 <Icon type="down"/>
      </Link>
    </span>
            )
          },
    }];

      const Search = Input.Search;

      // let searchContent = this.props.searchContent;
      let searchContent = ['待审核','已审核']
      let searchMenu = []
      for (let i = 0; i < searchContent.length; i++) {
        searchMenu.push(<Menu.Item key={i}>{searchContent[i]}</Menu.Item>)
      }

      const menu1 = (
        <Menu onClick={this.handleMenuClick}>
          {searchMenu}
        </Menu>
      );

      let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}

      return(
        <div>
          <Choose/>
          <div >
          {/*<Search searchContent={searchContent}/>*/}

            <RangePicker
              defaultValue={[moment('2018-03-01', dateFormat), moment('2018-03-02', dateFormat)]}
              format={dateFormat}
              onChange={this.onChangeDate}
            />

            <Dropdown overlay={menu1}>
              <Button style={styleButton}>
                活动状态 <Icon type="down"/>
              </Button>

            </Dropdown>

            <Search
              placeholder="input search text"
              onBlur={(e)=>{this.handleSearch(e)}}
              style={{width: 200,top:-1}}
              enterButton
            />


            <br/><br/><br/><br/><br/>

          </div>
          <div >
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          </div>

          <div className="show">
            <Table columns={columns} dataSource={this.state.Servers}/>
          </div>
        </div>
      )
    }
}




export default ServiceUnpassList
