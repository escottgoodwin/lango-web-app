import React, { Component } from "react";
import Flag from 'react-world-flags'

import {
  Row,
  Col,
  Container
} from "reactstrap";

import ArtRecs from '../components/ArtRecs'

class Dashboard extends Component{

  state={
    lang:'',
    language:'',
    flag:''
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
          <Row fluid='true'>
            <Col lg="3" md="6" sm="3">
              {user.fr_rec && 
              <div onClick={() => this.switchLang('fr')}>
              
              <h4> <Flag code="fr" height="30" /> French</h4>
              </div>
              }
            </Col>
            <Col lg="3" md="6" sm="3">
            {user.de_rec && 
              <div onClick={() => this.switchLang('de')}>
              
                <h4 > <Flag code="de" height="30" /> German</h4>
              </div>
            }
            </Col>
            <Col lg="3" md="3" sm="3" >
            {user.en_rec && 
              <div onClick={() => this.switchLang('en')}>
              
                <h4><Flag code="gb" height="30" /> English</h4>
              </div>
            }
            </Col>
            <Col lg="3" md="6" sm="6" >
            {user.es_rec && 
              <div onClick={() => this.switchLang('es')}>
              
                <h4><Flag code="es" height="30" /> Spanish</h4>
              </div>
            }
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
