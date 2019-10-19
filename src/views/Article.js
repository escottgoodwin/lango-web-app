import React,{Component} from "react";
import moment from 'moment'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import axios from 'axios'

import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_QUERY, TRANSLATION_MUTATION } from '../ApolloQueries'

function endReading(self){
  self.setState({playing:false})
  self.setState({paused:false})
  speechSynthesis.cancel()
}

class Article extends Component{

  state={
    playing:false,
    paused:false,
    rate:1,
    selObj:''
  }

  translateSel = (lang,artId) => {
    const selecttext = window.getSelection().toString()
    console.log(`Selected text: ${selecttext}`);
    const token = localStorage.getItem('auth_token')
    axios({
      // Of course the url should be where your actual GraphQL server is.
      url: process.env.REACT_APP_GRAPHQL_SERVER,
      method: 'post',
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      data: {
          query: TRANSLATION_MUTATION,
          variables: { 
            originalText: selecttext,
            artId,
            lang
          }
      }
    }).then((result) => {
        console.log(result)
    })
  }

  readArticles = (article,lang,rate) => {
      const voiceLang = `${lang}-${lang.toUpperCase()}`
      const utterance = new SpeechSynthesisUtterance(article)

      utterance.lang = voiceLang
      utterance.rate = rate
      speechSynthesis.speak(utterance)
      var self = this
      utterance.onend = function(event) {
        endReading(self)
        speechSynthesis.cancel()
      }

      this.setState({playing:true})
    }

    pauseReading(){
      speechSynthesis.pause()
      this.setState({paused:true})
    }
    
    resumeReading(){
      speechSynthesis.resume()
      this.setState({paused:false})
    }

    changeSpeed(article,lang,rate){
      speechSynthesis.cancel()
      this.setState({rate})
      this.readArticles(article,lang,rate)
    }

    componentWillUnmount(){
      speechSynthesis.cancel()
    }

    
  render(){
    const { art_id, lang } = this.props.location.state
    const { paused, rate, playing } = this.state
    return(

        <div className="content">

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { article, title, link, date, translations } = data.article
              
            return (

              <Container >

        <Row >
          <Col md="12" >

              <Row fluid='true'>
                <Col lg="12" md="12" sm="12">
                  <div>{moment(date).format('MMMM Do YYYY')}</div>
                  <div><h3><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></h3></div>
                </Col>
 
              </Row>

              <Row fluid='true'>
                <Col lg="1" md="1" sm="1">
                <div style={{marginBottom:20}}> 
                { 
                  playing ? 
                  <div>
                  {paused ? 

                    <FaPlayCircle color='#28a745' size={56} onClick={() => this.resumeReading()} />
                    :
                    <FaPauseCircle color='#dc3545' size={56} onClick={() => this.pauseReading()} />
                  }
                  </div>
                  :
                  <FaPlayCircle color='#28a745' size={56} onClick={() => this.readArticles(article,lang,rate)} />
                }
              </div>
            </Col>

                <Col lg="9" md="9" sm="9">
                <div style={{marginBottom:20}}> 
                  <ButtonGroup>
                    <Button outline  color="warning" onClick={() => this.changeSpeed(article,lang,1)}>1x  </Button>
           
                    <Button outline  color="warning" onClick={() => this.changeSpeed(article,lang,0.75)}>3/4x</Button>
       
                    <Button outline  color="warning" onClick={() => this.changeSpeed(article,lang,0.66)}>2/3x</Button>
    
                    <Button outline  color="warning" onClick={() => this.changeSpeed(article,lang,0.50)}>1/2x</Button>
            
                    </ButtonGroup>
                    </div>
                </Col>

                <Col lg="2" md="2" sm="2">
                <h5 style={{marginTop:20}}><b>Translations</b></h5>
                <hr /> 
                </Col>

              </Row>
    
              </Col>
 
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12">

              <Row>
                <Col lg="10" md="10" sm="10">
                <div onMouseUp={() => this.translateSel(lang,art_id)}>
                  <h5>{article}</h5>
                </div>
                </Col>

                <Col lg="2" md="2" sm="2">

                {translations.map(t => 
                  <>
                  <div style={{fontSize:18}}>{t.orig_text} - {t.trans_text}</div>
                  <hr />
                  </>
                  )}
            </Col>
          </Row>

        </Col>
        
        </Row>
        </Container>
      )
      }}
      </Query>
          
       
        </div>
    )
  }

}

export default Article
