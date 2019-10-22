import React, { Component } from "react";
import Flag from 'react-world-flags'

import {
  Row,
  Col,
  Button,
  Alert,
} from "reactstrap";

import { Mutation } from "react-apollo"
import { UPDATE_LANGS_MUTATION, USER_QUERY } from '../ApolloQueries'

class UpdateLangs extends Component {

  state = {
    en_rec: false,
    fr_rec: false,
    es_rec: false,
    de_rec: false,
    error: false,
    errormsg: '',
    success: false,
    successMsg: ''

  }

  componentDidMount() {
    const { en_rec, fr_rec, es_rec, de_rec } = this.props
    this.setState({ en_rec, fr_rec, es_rec, de_rec })
  }


  toggleEn = () => this.setState({ en_rec: !this.state.en_rec })
  toggleEs = () => this.setState({ es_rec: !this.state.es_rec })
  toggleFr = () => this.setState({ fr_rec: !this.state.fr_rec })
  toggleDe = () => this.setState({ de_rec: !this.state.de_rec })

  onDismiss = () => this.setState({ error: false })
  onDismissSuccess = () => this.setState({ success: false })

  render() {
    const { en_rec, fr_rec, es_rec, de_rec, error, errormsg, success, successMsg } = this.state

    return (
      <div >
        <Row >
          <Col >
            <h5>Article Recommedations Languages</h5>
          </Col>
        </Row>

        <Row fluid='true'>
          <Col >
            <table>
            <tbody>
            <tr height="80">
              <td width="120">
              {
              en_rec &&
              <Flag code="gb" height="54" />
            }

              </td>
              <td width="120">

              {
              fr_rec &&

              <Flag code="fr" height="68" />

            }
                
              </td>
              <td width="120">

              {
              de_rec &&

              <Flag code="de" height="63" />

            }
                
              </td>
              <td width="120">
              {
              es_rec &&

              <Flag code="es" height="70" />

            }
              </td>
            </tr>

            <tr>
              <td>
              <Button outline color='warning' onClick={() => this.toggleEn()}>English</Button>

              </td>
              <td>
              <Button outline color='warning' onClick={() => this.toggleFr()}>French</Button>
       
              </td>
              <td>
              <Button outline color='warning' onClick={() => this.toggleDe()}>German</Button>
       
              </td>
              <td>
              <Button outline color='warning' onClick={() => this.toggleEs()}>Spanish</Button>
       
              </td>
            </tr>
            </tbody>
            </table>

          </Col>
          </Row>

          <Row>

          <Col >
          <Mutation
              mutation={UPDATE_LANGS_MUTATION}
              variables={{ en_rec, fr_rec, es_rec, de_rec }}
              onCompleted={data => this._confirm(data)}
              onError={error => this._error(error)}
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
      </div>
    )
  }

  _confirm = async data => {
    const user = JSON.parse(localStorage.getItem('user'))
    const { en_rec, fr_rec, es_rec, de_rec } = this.state
    user['en_rec'] = en_rec
    user['fr_rec'] = fr_rec
    user['de_rec'] = de_rec
    user['es_rec'] = es_rec

    localStorage.setItem('user', JSON.stringify(user))
    this.setState({ success: true, successMsg: 'Languages Updated' })
  }

  _error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err, i) => err.message)
    this.setState({ error: true, errormsg: gerrorMessage })

    error.networkError &&
      this.setState({ error: true, errormsg: error.networkError.message })
  }
}

export default UpdateLangs
