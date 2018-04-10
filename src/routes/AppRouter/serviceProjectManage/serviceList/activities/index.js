import React, {Component} from 'react'
import {Icon,Table,Breadcrumb } from 'antd'
import {Link} from 'dva/router'
import './index.css'
import UserEvaluation from '../userEvaluation/index'
import axios from "axios/index";

const routes = [
  {
    path: '/servicelist',
    breadcrumbName: '服务项目管理'
  }, {
    path: '/activity',
    breadcrumbName: '项目详情'
  }];
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}


class Activity extends Component {

  constructor(){
    super()
    this.state={
      dataSource: {
        title: '',
        status:'',
        join_start_at: '',
        start_at: '',
        end_at: '',
        service_length: '',
        join_end_at:'',
        position_name: '',
        people_num:'',
        has_people_num: '',
        content: '',
        user_name: '',
        apply_res:'',
        apply_status:'',
      },
    }
    this.getServer = this.getServer.bind(this)
  }

  componentWillMount() {
    this.getServer()
  }

  componentWillUnmount() {
    this.getServer = false
  }

  getServer() {
    axios.get(`http://volunteer.andyhui.xin/vps/${this.props.match.params.id}`)
      .then(res => {
        const dataSource = {
          title: res.data.vpInfo.title,
          join_start_at: res.data.vpInfo.join_start_at,
          start_at: res.data.vpInfo.start_at,
          end_at: res.data.vpInfo.end_at,
          service_length: res.data.vpInfo.service_length,
          position_name: res.data.vpInfo.position_name,
          has_people_num: res.data.vpInfo.has_people_num,
          content: res.data.vpInfo.content,
          status:res.data.vpInfo.status,
          user_name: res.data.vpInfo.user_name,
          join_end_at:res.data.vpInfo.join_end_at,
          people_num:res.data.vpInfo.people_num,
          position_cdn:res.data.vpInfo.position_cdn,
          apply_status: res.data.vpInfo.apply_status,
          apply_res: res.data.vpInfo.apply_res,

        }
        this.setState({dataSource: dataSource})
      })
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
    return (
      <div>
        <div>
          <Breadcrumb itemRender={itemRender} routes={routes} />
          <Icon type="caret-right"/> <span className="firstTitle" >  需求服务信息详情</span> <br/> <br/>
          <br/> <span>项目名称：{this.state.dataSource.title}</span>
          <br/> <span>报名开始时间：{this.state.dataSource.join_start_at}</span>
          <br/> <span>活动开始：{this.state.dataSource.start_at}</span>
          <br/> <span>服务时长：{this.state.dataSource.service_length}小时</span>
          <br/> <span>活动地点：{this.state.dataSource.position_name}</span>
          <br/> <span>描述说明：{this.state.dataSource.content}</span>
          <br/> <span>发起人：{this.state.dataSource.user_name}</span> <br/> <br/> <br/>
        </div>

        <div>
          <Icon type="caret-right"/><span className="firstTitle">影像库（视频或照片）</span>
          <br/>
         <img  src={require('../../../../../images/3.png')} width={200} height={200}/>
          <br/>
          <img src={require('../../../../../images/4.png')} width={200} height={200}/>
          <br/> <br/> <br/>
        </div>

        <div>
          <Icon type="caret-right"/> <span className="firstTitle" >  参与项目详情</span> <br/> <br/>
          <div>
              <Table  columns={columns} dataSource={data} />
          </div>
          <br/> <br/> <br/>
        </div>

        <div>
            <UserEvaluation path={this.props.match.params.id}/>
          <br/><br/><br/>
        </div>

        <div>
          <Icon type="caret-right"/> <span className="firstTitle" >  活动心得</span> <br/> <br/>
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
