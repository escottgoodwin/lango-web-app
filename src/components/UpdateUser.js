import React,{Component} from "react";
import moment from 'moment'

import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Dropdown, 
  DropdownToggle,
  DropdownMenu, 
  DropdownItem,
  FormGroup,
} from "reactstrap";

import { Mutation } from "react-apollo"
import { UPDATE_USER_MUTATION, USER_QUERY } from '../ApolloQueries'

const langSelect = (nativeLang) =>{
  if (nativeLang==='en'){
    return "English"
 }

 if (nativeLang==='fr'){
  return "French"
} 

if (nativeLang==='en'){
return "English"
}

if (nativeLang==='fr'){
return "French"
} 
if (nativeLang==='de'){
return "German"
}

if (nativeLang==='es'){
return "Spanish"
} 
}

class UpdateUser extends Component{

  state={
    name:'',
    email:'',
    native_lang:'',
    nativeLanguage:'',
    created_at:'',
    error:false,
    errormsg:'',
    dropdownOpen:false,
    success:false,
    successMsg:''
  }

  componentDidMount(){
    const { name, email, native_lang, created_at } = this.props
    this.setState({ name, email, native_lang, created_at })
  }

  toggle = () => this.setState({dropdownOpen:!this.state.dropdownOpen})
  onDismiss = () => this.setState({ error: false })

  render(){
    const { name, email, native_lang, created_at, error, errormsg, success, successMsg } = this.state
    const nativeLanguage = langSelect(native_lang); 
    return(

        <div >
        

        <Row >
          <Col >
          <h5>Update User Information</h5>
          </Col>
        </Row>
            

          <Row fluid='true'>
          <Col lg="8" md="8" sm="8">

          <Row fluid='true'>
          <Col >
          <p >
            Member Since: {moment(created_at).format('MMMM Do YYYY')}
          </p>
          
          </Col>
          </Row>
          
          <Row fluid='true'>
          <Col >
          <label >
            Name
          </label>
          
          <Input onChange={e => this.setState({ name: e.target.value })} value={name} placeholder="Name" />
         
          </Col>
          </Row>
       
          <Row fluid='true'>
          <Col >
          
          <label >
            Email address
          </label>
         
            <Input  onChange={e => this.setState({ email: e.target.value })}  value={email} placeholder="Email" />
            
          </Col>
          </Row>

          </Col>

          <Col lg="4" md="4" sm="4">
          
          <FormGroup >
            <label >
              Native Language
            </label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                  {nativeLanguage}
              </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem onClick={() => this.setState({native_lang:'en',nativeLanguage:'English'})}>English</DropdownItem>
                  <DropdownItem onClick={() => this.setState({native_lang:'fr',nativeLanguage:'French'})}>French</DropdownItem>
                  <DropdownItem onClick={() => this.setState({native_lang:'de',nativeLanguage:'German'})}>German</DropdownItem>
                  <DropdownItem onClick={() => this.setState({native_lang:'es',nativeLanguage:'Spanish'})}>Spanish</DropdownItem>
              </DropdownMenu>
              </Dropdown>
          </FormGroup>
            
          </Col>
            
        </Row>

        <Row>
          <Col md="12">

          <Mutation
              mutation={UPDATE_USER_MUTATION}
              variables={{ name, native_lang, email }}
              onCompleted={data => this._confirm(data)}
              onError={error => this._error (error)}
              refetchQueries={() => {
                return [{
                   query: USER_QUERY
               }];
            }}
            >
            {mutation => (

            <Button onClick={mutation} color="primary" outline >
              Update User
            </Button>

              )}
          </Mutation>
           
           
          </Col>
        </Row>
            

        <Row>
          <Col md="12">

            <Alert color="success" isOpen={success} toggle={this.onDismiss}>
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
        
        </div>

    )
  }

  _confirm = async data => {
    
    this.setState({success:true,successMsg:'User Info Updated!'})
  }

  _error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ error: true, errormsg: gerrorMessage})

    error.networkError &&
      this.setState({ error: true, errormsg: error.networkError.message})
}
}

export default UpdateUser
