import { Modal, Button, Input } from 'antd'
import './modal.less'

const TextArea = Input.TextArea
class ModalEdit extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  render() {
    return (
      <div>
        <Button className='mybutton' type="primary" onClick={() => this.setModal1Visible(true)}>修改</Button>
        <Modal
          title='修改单位信息'
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <div>带*为必填项</div>
          <form action="" method='get'>
          单位名称(*)： <Input type='text' required='required' />
          单位负责人： <Input type='text' />
          单位电话： <Input type='text'/>
          单位传真： <Input type='text'/>
          备注: <TextArea className='bz'/>
          </form>
        </Modal>
        <Button className='mybutton' type="primary" onClick={() => this.setModal1Visible(true)}>添加</Button>
        <Modal
          title='添加单位信息'
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <div>带*为必填项</div>
          <form action="" method='get'>
            单位名称(*)： <Input type='text' required='required' />
            单位负责人： <Input type='text' />
            单位电话： <Input type='text'/>
            单位传真： <Input type='text'/>
            备注: <TextArea className='bz'/>
          </form>
        </Modal>
      </div>
    );
  }
}


export default ModalEdit