import React, {Component} from 'react'
import {Link} from 'dva/router'
import './index.css'

class Choose extends Component {

  constructor() {
    super()
  }

  render() {

    return (

      <div>
        <div className="choose">
          <Link to="/servicelist"><span className="list">志愿服务项目</span></Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Link to="/serviceunpasslist"><span className="desire">待审核需求(4)</span></Link>
        </div>
        <br/>
      </div>


    )
  }
}

export default Choose
