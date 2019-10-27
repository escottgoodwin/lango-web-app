import React, { Component } from "react";
import Flag from 'react-world-flags'

import {
  Row,
  Col,
  Container
} from "reactstrap";

import ArtRecs from '../components/ArtRecs1'

class Dashboard extends Component{

  state={
    lang:'',
    language:'',
    flag:'',
  }

  switchLang(lang){
    if (lang==='fr'){
      this.setState({
        lang:'fr',
        language:'French',
        flag:"FR"
      })
    }
    if (lang==='de'){
      this.setState({
        lang:'de',
        language:'German',
        flag:"DE"
      })
    }
    if (lang==='en'){
      this.setState({
        lang:'en',
        language:'English',
        flag:"GB"
      })
    }
    if (lang==='es'){
      this.setState({
        lang:'es',
        language:'Spanish',
        flag:"ES"
      })
    }
  }

  componentWillUnmount(){
    this.setState({
      lang:'',
      language:'',
      flag:''
    })
  }

    render(){

      const user = JSON.parse(localStorage.getItem('user'))
      const { lang, language, flag } = this.state

  return(

        <div className="content">
        <Container >
        <Row>
          <Col>
          <center>
          <table style={{width:'100%'}}>
            <tbody>
              <tr>

              {user.en_rec && 
                <td>
                  <div onClick={() => this.switchLang('en')}>
              
              <h4> <Flag code="gb" height="30" /> English</h4>
              </div>
              <div>
                </div>
                </td>
                }

                {user.fr_rec && 
                <td>
                  <div onClick={() => this.switchLang('fr')}>
              
              <h4> <Flag code="fr" height="30" /> French</h4>
              </div>
                </td>
                }

              {user.de_rec && 
                <td>
                  <div onClick={() => this.switchLang('de')}>
              
              <h4> <Flag code="de" height="30" /> German</h4>
              </div>
                </td>
                }

            {user.es_rec && 
                <td>
                  <div onClick={() => this.switchLang('es')}>
              
              <h4> <Flag code="es" height="30" /> Spanish</h4>
              </div>
                </td>
                }

              </tr>
            </tbody>
          </table>
          </center>
          </Col>


        </Row>
          <hr />

          <Row fluid='true'>
            <Col md="12" >
              {
                lang.length>0 &&
                  <ArtRecs lang={lang} flag={flag} language={language}/>
              }
            </Col>
          </Row>

        </Container>
        </div>
   )
  }
}
  

export default Dashboard;
