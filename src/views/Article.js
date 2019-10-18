import React,{Component} from "react";
import moment from 'moment'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_QUERY } from '../ApolloQueries'

function endReading(self){
  self.setState({playing:false})
  self.setState({paused:false})
  speechSynthesis.cancel()
}

class Article extends Component{

  state={
    playing:false,
    paused:false,
    rate:1
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
          <Col md="10" >

                <Row fluid='true'>
                <Col lg="12" md="12" sm="12">
                <div>{moment(date).format('MMMM Do YYYY')}</div>
                <div><h3><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></h3></div>
              
                </Col>
                  
              </Row>

              <Row>
                <Col lg="12" md="12" sm="12">

                  <h5>{article}</h5>
                
                </Col>
              </Row>

        </Col>
        <Col md="2">
          <div style={{margin:30}}>
            { 
              playing ? 
              <div>
              {paused ? 

                <FaPlayCircle color='#28a745' size={72} onClick={() => this.resumeReading()} />
                :
                <FaPauseCircle color='#dc3545' size={72} onClick={() => this.pauseReading()} />
              }
              </div>
              :
              <FaPlayCircle color='#28a745' size={72} onClick={() => this.readArticles(article,lang,rate)} />
            }
            </div>
            <div style={{margin:30}}>
            <div>
            <Button outline  width='50'  color="info" onClick={() => this.changeSpeed(article,lang,1)}>1x  </Button>
            </div>
            <div>
            <Button outline width='50' color="info" onClick={() => this.changeSpeed(article,lang,0.75)}>3/4x</Button>
            </div>
            <div>
            <Button outline width='50' color="info" onClick={() => this.changeSpeed(article,lang,0.66)}>2/3x</Button>
            </div>
            <div>
            <Button outline width='50' color="info" onClick={() => this.changeSpeed(article,lang,0.50)}>1/2x</Button>
            </div>
            
            </div>

          <center>
          <div><h6>Translations</h6></div>

          {translations.map(t => 
            <div>{t.orig_text} - {t.trans_text}</div>
            )}
          </center>
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
