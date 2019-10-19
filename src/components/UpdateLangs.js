import React,{Component} from "react";

import {
  Row,
  Col,
  Button,
  Alert,
} from "reactstrap";

import { Mutation } from "react-apollo"
import { UPDATE_LANGS_MUTATION, USER_QUERY } from '../ApolloQueries'

class UpdateLangs extends Component{

  state={
    en_rec:false,
    fr_rec:false,
    es_rec:false,
    de_rec:false,
    error:false,
    errormsg:'',
    success:false,
    successMsg:''

    }

  componentDidMount(){
    const { en_rec, fr_rec, es_rec,de_rec } = this.props
    this.setState({ en_rec, fr_rec, es_rec, de_rec })
  }

  
  toggleEn = () => this.setState({ en_rec: !this.state.en_rec })
  toggleEs = () => this.setState({ es_rec: !this.state.es_rec })
  toggleFr = () => this.setState({ fr_rec: !this.state.fr_rec})
  toggleDe = () => this.setState({ de_rec: !this.state.de_rec })

  onDismiss = () => this.setState({ error: false })

  render(){
    const { en_rec, fr_rec, es_rec, de_rec, error, errormsg, success, successMsg } = this.state
          
    return(
      <div >
        <Row >
          <Col >
            <h5>Get Article Recommedations For the Following Lanauges</h5>
          </Col>
        </Row>

        <Row fluid='true'>
          <Col md="5">
            <Button outline color='warning' active={en_rec} onClick={() => this.toggleEn()}>English</Button>
            <Button outline color='warning' active={fr_rec} onClick={() => this.toggleFr()}>French</Button>
            <Button outline color='warning' active={de_rec}onClick={() => this.toggleDe()}>German</Button>
            <Button outline color='warning' active={es_rec} onClick={() => this.toggleEs()}>Spanish</Button>

          </Col>

          <Col md="7">

          <Mutation
              mutation={UPDATE_LANGS_MUTATION}
              variables={{ en_rec, fr_rec, es_rec, de_rec }}
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
              Update Languages
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
    console.log(data)
    this.setState({success:true,successMsg:'Languages Updated'})
  }

  _error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ error: true, errormsg: gerrorMessage})

    error.networkError &&
      this.setState({ error: true, errormsg: error.networkError.message})
}
}

export default UpdateLangs
