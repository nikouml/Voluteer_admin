import React, {Component} from 'react'
import {Icon,Input,Button,Table } from 'antd'
import {Link} from 'dva/router'
import './index.css'
// import request from "../../../../utils/request";
import UserEvaluation from '../userEvaluation/index'
const titleStyle={fontSize:35,fontWeight:'bold',marginLeft:50}
const SecondtitleStyle={fontSize:25,fontWeight:'bold',marginLeft:50}





class Activity extends Component {

  constructor(){
    super()
    this.state={
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  }

  start = () => {
    this.setState({ loading: true })
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }


  render(){

    const content='在实际工作中我们会遇到需要为“不定宽度的块状元素”设置居中，比如网页上的分页导航，因为分页的数量是不确定的，所以我们不能通过设置宽度来限制它的弹性。(不定宽块状元素：块状元素的宽度width不固定。)有三种方法可以对不定宽块状元素进行居中'

    const columns = [
      {
        title:'序号',
        dataIndex:'num'
      },
      {
        title: '报名',
        dataIndex: 'name',
      },
      {
      title: '报名时间',
      dataIndex: 'time',
    }, {
      title: '微信通知',
      dataIndex: 'notice',
    },
      {
        title:'签到时间',
        dataIndex:'signIn',
      },
      {
        title:'签退时间',
        dataIndex:'signOut'
      },
      {
        title:'签到状态',
        dataIndex:'signInState'
      },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        num:`${i+1}`,
        name: `张 ${i+1}`,
        time: '2015年2月1日',
        notice: '已送达',
        signIn:'2015年2月1日9点03分21秒',
        signOut:'2015年2月1日19点03分12秒',
        signInState:'已签到'

      });
    }

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;





    return (
      <div>
        <div>
          <Icon type="caret-right"/> <span style={titleStyle} >  需求服务信息详情</span> <br/> <br/>
          <br/> <span>项目名称：敬老爱老</span>
          <br/> <span>报名时间：2018年2月1日至2018年2月10日</span>
          <br/> <span>活动时长：2018年2月13日9:00-12:00</span>
          <br/> <span>服务时长：3小时</span>
          <br/> <span>活动地点：福州市第二社会福利院</span>
          <br/> <span>报名人数：10人</span>
          <br/> <span>描述说明：到福利院开展"敬老爱老"活动</span>
          <br/> <span>发起人：晓明</span> <br/> <br/> <br/>
        </div>

        <div>
          <Icon type="caret-right"/><span style={titleStyle}>影像库（视频或照片）</span>
          <br/>
         <img  src={require('../../../../../images/3.png')} width={200} height={200}/>
          <br/>
          <img src={require('../../../../../images/4.png')} width={200} height={200}/>

          <br/> <br/> <br/>
        </div>

        <div>
          <Icon type="caret-right"/> <span style={titleStyle} >  参与项目详情</span> <br/> <br/>
          <Icon type="caret-right"/> <span style={SecondtitleStyle} >  参与人员名单</span> <br/> <br/>
          <div>
            <div style={{ marginBottom: 16,marginLeft:500 }}>

              <Button type="primary" ><Link to='/activity/1/weixin'>微信内容编辑</Link></Button>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
                style={{marginLeft:'50px'}}
              >
                群发
              </Button>
              <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选择了 ${selectedRowKeys.length} 个人员` : ''}
          </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
          <div>
            <Icon type="caret-right"/><span style={titleStyle}>参与项目影像库</span>
            <br/>
            <span>签到前</span> <img  src={require('../../../../../images/3.png')} width={200} height={200}/>
            <br/>
            <span>签到后</span> <img src={require('../../../../../images/4.png')} width={200} height={200}/>
          </div>






          <br/> <br/> <br/>
        </div>

        <div>
          <Icon type="caret-right"/> <span style={titleStyle} >  评价</span> <br/> <br/>

          <div style={{marginLeft:50}}>
            <Icon type="caret-right"/> <span style={SecondtitleStyle} >  发布者评价</span> <br/> <br/>
            <UserEvaluation writer={'张三'} content={content} date={'2016年5月5日'} />

            <br/><br/><br/>

            <Icon type="caret-right"/> <span style={SecondtitleStyle} > 志愿者评价</span> <br/> <br/>
            <UserEvaluation writer={'张三'} content={content} date={'2016年5月5日'} />
            <UserEvaluation writer={'张三'} content={content} date={'2016年5月5日'} />

          </div>

          <br/><br/><br/>
        </div>

        <div>
          <Icon type="caret-right"/> <span style={titleStyle} >  活动心得</span> <br/> <br/>
          <div style={{marginLeft:50}}>
             <span>1.xxxxxxxxx</span> <br/>
             <span>2.xxxxxxxxx</span>  <br/>
             <span>3.xxxxxxxxx</span> <br/>
          </div>
        </div>


      </div>
    )

  }
}

export default Activity
