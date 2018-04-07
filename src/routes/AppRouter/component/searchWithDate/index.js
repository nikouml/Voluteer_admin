import React, {Component} from 'react'
// import {Link} from 'dva/router'
// import './index.css'
import {Input, Menu, Dropdown, Button, Icon, message, Divider, DatePicker} from 'antd'
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD';


const APIDateFormate= "YYYY-MM-DD hh:mm:ss"


const {RangePicker} = DatePicker;

class Search extends Component {

  constructor() {
    super()

    this.onChangeConsoleDate=this.onChangeConsoleDate.bind(this)
  }

  //  handleButtonClick(e) {
  //     message.info('Click on left button.');
  //     console.log('click left button', e);
  // }

  handleMenuClick(e) {
    message.info('暂时无法搜索.');
    console.log('click', e);
  }

  fetchSerch() {
    fetch(' http://localhost:3333/apply/{vpId}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (json.code === 0) {
        message.success('insert success')
        this.setState({submitted: true})

      } else {
        message.error('failed')
      }
    }).catch((e) => {
      console.log(e.message)
    })
  }

  onChangeConsoleDate(e){

    //http://momentjs.cn/docs/#/displaying/calendar-time/ 文档
    let dates=e.valueOf();
    // let date1=dates[0]
    let date1=moment("2018-04-26 12:09:47","YYYY-MM-DD hh:mm:ss")
    console.log(date1.calendar())
  }


  render() {
    const Search = Input.Search;

    let searchContent = this.props.searchContent;
    let searchMenu = []
    for (let i = 0; i < searchContent.length; i++) {
      searchMenu.push(<Menu.Item key={i}>{searchContent[i]}</Menu.Item>)
    }
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {searchMenu}
      </Menu>
    );

    let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}
    let styleInput = {width: 150 + 'px'}


    return (

      <div>

        {/*<Input placeholder="初次发生开始时间" style={styleInput}/>*/}
        {/*&nbsp; &nbsp;  &nbsp;*/}
        {/*<span>至</span>*/}
        {/*&nbsp; &nbsp;  &nbsp;*/}
        {/*<Input placeholder="初次发生结束时间" style={styleInput}/>*/}
        <RangePicker
          defaultValue={[moment('2018-01-01', dateFormat), moment('2017-02-01', dateFormat)]}
          format={dateFormat}
          onChange={this.onChangeConsoleDate}
        />

        <Dropdown overlay={menu}>
          <Button style={styleButton}>
            活动状态 <Icon type="down"/>
          </Button>

        </Dropdown>

        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{width: 200}}
        />


        <br/><br/><br/><br/><br/>
      </div>


    )
  }
}

export default Search
