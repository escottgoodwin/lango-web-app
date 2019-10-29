import React,{Component} from "react";
import moment from 'moment'
import axios from 'axios'

import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup
} from "reactstrap";

import { Query, Mutation } from "react-apollo"
import { ARTICLE_QUERY, TRANSLATION_MUTATION } from '../ApolloQueries'

var Highlight = require('react-highlighter');

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
    originalText:'',
    hoverTrans:''
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
    const { paused, rate, playing, originalText, hoverTrans } = this.state

    return(
      <>
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
                  <div style={{marginTop:20}}>{moment(date).format('MMMM Do YYYY')}</div>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <div style={{color:'#3A7891'}}><h3>{title}</h3></div></a>
                </Col>
 
              </Row>

              <Row fluid='true'>
                <Col lg="1" md="1" sm="1">
                <div style={{marginBottom:20}}> 
                { 
                  playing ? 
                  <div>
                  {
                    paused ? 
                    <i className="nc-icon nc-button-play" onClick={() => this.resumeReading()} style={{color:'#28a745',fontSize:'4em'}}/>
                    :
                    <i className="nc-icon nc-button-pause" onClick={() => this.pauseReading()} style={{color:'#dc3545',fontSize:'4em'}}/>
                  }
                  </div>
                  :
                  <i className="nc-icon nc-button-play" onClick={() => this.readArticles(article,lang,rate)} style={{color:'#28a745',fontSize:'4em'}}/>
                 }
              </div>
            </Col>

                <Col lg="9" md="9" sm="9">
                <div style={{marginBottom:20}}> 
                
                  <ButtonGroup>
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,1)}>1x  </Button>
           
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.75)}>3/4x</Button>
       
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.66)}>2/3x</Button>
    
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.50)}>1/2x</Button>
            
                    </ButtonGroup>
                    </div>
                </Col>

                <Col lg="2" md="2" sm="2">
                <h5 style={{marginTop:20,color:'#17a2b8'}}><b>Translations</b></h5>
                <hr /> 
                </Col>

              </Row>
    
              </Col>
 
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12">

              <Row>
                <Col lg="10" md="10" sm="10">
                  
                  <div style={{height:600,overflow:'auto'}} onMouseUp={() => this.setState({originalText:window.getSelection().toString()})}>
                    <h5>
                    <Highlight search={hoverTrans} matchStyle={{color:'#17a2b8'}}>
                      {article}
                    </Highlight>
                    </h5>
                  </div>
   
                  
                
                </Col>

                <Col lg="2" md="2" sm="2">
                <div style={{fontSize:14}}>Select/Highlight Text</div>
                <div style={{height:50,fontSize:20,color:'#17a2b8'}}>{originalText}</div>
                
      
                <div>
                <Mutation
                  mutation={TRANSLATION_MUTATION}
                  variables={{ 
                    originalText,
                    artId: art_id,
                    lang
                  }}
                  onError={error => this._error (error)}
                  refetchQueries={() => { return [{
                    query: ARTICLE_QUERY,
                    variables: { artId: art_id, lang }}]
                  }}
                >
                {mutation => (

                  <Button outline color="info" onClick={mutation}>
                    Translate
                  </Button>
                  )}
              </Mutation>
                 

                </div>

                  <div style={{height:500,overflow:'auto'}}>
                  {translations.map((t,i) => 
                    <div key={i} onMouseOver={() => this.setState({ hoverTrans: t.orig_text })} onMouseOut={() => this.setState({ hoverTrans: '' })}>
                    <div style={{fontSize:18,color:"#17a2b8"}}>{t.orig_text}</div>
                    <div style={{fontSize:18,color:"#28a745"}}>{t.trans_text}</div>
                    <hr />
                  </div>
                  )}
                  </div>
            </Col>
          </Row>

        </Col>
        
        </Row>
        </Container>
      )
      }}
      </Query>
          
       
        </div>
        
</>
    )
  }

  _error = async error => {
    console.log(error)
}

}

export default Article
