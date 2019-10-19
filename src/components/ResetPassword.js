import React,{Component} from "react";

import {
  Row,
  Col,
  Input,
  Button,
  Alert,
} from "reactstrap";

import firebase from 'firebase/app';
import 'firebase/auth'

class ResetPassword extends Component{

  state={
    email:'',
    error:false,
    errormsg:'',
    success:false,
    successMsg:''
  }

  componentDidMount(){
    const { email } = this.props
    this.setState({ email })
  }

  resendPassword = (emailAddress) => {
    firebase.auth.sendPasswordResetEmail(emailAddress).then(function() {
      this.setState({successMsg:'Email Updated!',email:true})
    }).catch(function(error) {
      this.setState({errorMsg:error.message,error:true})
    });
  }

  onDismiss = () => this.setState({ error: false })

  onDismissSuccess = () => this.setState({ success: false })

  render(){
    const { email, error, errormsg, success, successMsg } = this.state
          
    return(
      <>
      <Row >
        <Col >
          <h5>Reset Password</h5>
        </Col>
      </Row>

    <Row fluid='true'>
      <Col lg="12" md="12" sm="12">
      <label >
        Email address
      </label>

        <Input  value={email} onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
   
        <Button color="primary" outline onClick={() => this.resendPassword(email)}  >
          Reset Password
        </Button>
      </Col>
        
    </Row>

        <Row>
          <Col md="12">

            <Alert color="success" isOpen={success} toggle={this.onDismissSuccess}>
              {successMsg}
            </Alert>

          </Col>
        </Row>

    
        <Row>
          <Col md="12">

            <Alert color="danger" isOpen={error} toggle={this.onDismiss}>
              {errormsg}
            </Alert>

          </Col>
        </Row>
      </>
    )
  }

}

export default ResetPassword
