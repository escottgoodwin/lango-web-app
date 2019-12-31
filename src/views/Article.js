import React,{Component} from "react";
import moment from 'moment'
import axios from 'axios'
import {langSwitch} from '../util'
import Flag from 'react-world-flags'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';

import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  Input,
  Alert
} from "reactstrap";

import { Query, Mutation } from "react-apollo"
import { ARTICLE_QUERY, TRANSLATION_MUTATION, ADD_PLAYLIST_MUTATION, REMOVE_PLAYLIST_MUTATION } from '../ApolloQueries'

import Error from './Error'

var Highlight = require('react-highlighter');

function endReading(self){
  self.setState({playing:false})
  self.setState({paused:false})
  // update recs as played
  speechSynthesis.cancel()
}

class Article extends Component{

  state={
    playing:false,
    paused:false,
    rate:1,
    originalText:'',
    hoverTrans:'',
    flag:'',
    language:'',
    message:'',
    alert:false,
    errorOpen:false,
    playlist:false
  }

  componentDidMount(){
    const { lang, playlist } = this.props.location.state
    const { language, flag } = langSwitch(lang)
    this.setState({playlist, language, flag})
  }

  translateSel = async (lang,artId) => {
    const selecttext = window.getSelection().toString()

    const token = localStorage.getItem('auth_token')
    await axios({
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
    const { playlist, flag, language, paused, rate, playing, originalText, hoverTrans, alert, message, errorOpen } = this.state
    return(
      <>
        <div className="content">

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
                if (error) return <Error {...error} />

                const { article, title, link, date, translations } = data.article
              
            return (

        <Container >

        <Row >
          <Col md="12" >

          <Row fluid='true'>
                <Col lg="12" md="12" sm="12">
                <div style={{marginTop:20,marginBottom:20}}>
                  <table>
                    <tbody>
                    <tr>
                      <td valign="top" width="150">
                        <div style={{marginRight:10}}>
                        <Link to={{
                            pathname: `/admin/dashboard/${language.toLowerCase()}`,
                            state: {
                              lang
                            }
                          }}>
                          <Flag code={flag} width="150" />
                        </Link >
                   
                      </div>
                      </td>
                      <td valign="top">
                    <div>
                    {moment(date).format('MMMM Do YYYY')}
                  </div>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <div style={{color:'#3A7891'}}>
                      <h5>{title}</h5>
                    </div>
                  </a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                  
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

                <Col lg="4" md="4" sm="4">
                <div style={{marginBottom:20}}> 
                
                  <ButtonGroup>
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,1)}>1x  </Button>
           
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.75)}>3/4x</Button>
       
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.66)}>2/3x</Button>
    
                    <Button outline  color="success" onClick={() => this.changeSpeed(article,lang,0.50)}>1/2x</Button>
            
                    </ButtonGroup>
                    </div>
                </Col>

                <Col lg="3" md="3" sm="3">
                   <Alert isOpen={alert} toggle={() => this.setState({alert:false})} color="success">{message}</Alert>
                   <Alert isOpen={errorOpen} toggle={() => this.setState({errorOpen:false})} color="danger">{message}</Alert>
                </Col>


                <Col lg="2" md="2" sm="2">

                  {playlist ? 

                    <Mutation
                      mutation={REMOVE_PLAYLIST_MUTATION}
                      variables={{ art_id }}
                      onError={error => this._error(error)}
                      onCompleted={data => this._confirm(data.removeFromPlaylist.message)}
                      >
                      {mutation => (
                        <Button onClick={mutation} color="success">Playlist</Button>
                      )}
                    </Mutation>
                    
                    :
 
                    <Mutation
                      mutation={ADD_PLAYLIST_MUTATION}
                      variables={{ art_id }}
                      onError={error => this._error(error)}
                      onCompleted={data => this._confirm(data.addToPlaylist.message)}
                      >
                      {mutation => (
                        <Button onClick={mutation}  outline color="success">Playlist</Button>
                      )}
                    </Mutation>
                  }

                </Col>

                

                <Col lg="2" md="2" sm="2">
                  <h5 style={{color:'#17a2b8',marginTop:15}}><b>Translations</b></h5>
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
                      { ReactHtmlParser(article) }
                    </Highlight>
                    </h5>
                  </div>
   
                  
                
                </Col>

                <Col lg="2" md="2" sm="2">
                
                  <Input  onChange={e => this.setState({ originalText: e.target.value })}  value={originalText} placeholder="Highlight Text"/>

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
    this.setState({message: error.message, errorOpen:true})
  }

  _confirm = async message => {
    const { playlist } = this.state
    this.setState({message, alert:true, playlist: !playlist})
    setTimeout(
      function() {
        this.setState({message:'', alert:false})
      }.bind(this),
      2000
    )
}

}

export default Article
