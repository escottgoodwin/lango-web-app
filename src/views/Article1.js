import React,{useState, useQuery, useMutation} from "react";
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup
} from "reactstrap";

import { ARTICLE_QUERY, TRANSLATION_MUTATION } from '../ApolloQueries'

function Article(){

  const art_id='874f45e3041245119964bbee6a5ea522'
  const lang = 'fr'
  
  const [ playing, setPlaying ] = useState(false)
  const [ paused, setPaused ] = useState(false)
  const [ rate, setRate ] = useState(1)

  const [ mutate, { datam } ] = useMutation(TRANSLATION_MUTATION)
  
    const translateSel = (lang,artId,mutate) => {
      const originalText = window.getSelection().toString()

      mutate({
        variables: {
          originalText,
          artId,
          lang
        },
        refetchQueries: ["article"]
      })
    
    }

  const readArticles = (article,lang,rate) => {
      const voiceLang = `${lang}-${lang.toUpperCase()}`
      const utterance = new SpeechSynthesisUtterance(article)

      utterance.lang = voiceLang
      utterance.rate = rate
      speechSynthesis.speak(utterance)

      utterance.onend=(event)=> {
        setPaused(false)
        setPlaying(false)
        speechSynthesis.cancel()
      }
      setPlaying(true)
    }

    const pauseReading=()=>{
      speechSynthesis.pause()
      setPaused(true)
    }
    
    const resumeReading=()=>{
      speechSynthesis.resume()
      setPaused(false)
    }

    const changeSpeed=(article,lang,rate)=>{
      speechSynthesis.cancel()
      setRate(rate)
      readArticles(article,lang,rate)
    }

    const { loading, error, data } = useQuery(ARTICLE_QUERY,{ variables: { artId: art_id, lang }, })
    const { article, title, link, date, translations } = data.article

    if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
    if (error) return <div>{JSON.stringify(error)}</div>

    return(

        <div className="content">

        <Container >

        <Row >
          <Col md="12" >

              <Row fluid='true'>
                <Col lg="12" md="12" sm="12">
                  <div>{moment(date).format('MMMM Do YYYY')}</div>
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
                  {paused ? 

                    <FaPlayCircle color='#28a745' size={56} onClick={() => resumeReading()} />
                    :
                    <FaPauseCircle color='#dc3545' size={56} onClick={() => pauseReading()} />
                  }
                  </div>
                  :
                  <FaPlayCircle color='#28a745' size={56} onClick={() => readArticles(article,lang,rate)} />
                }
              </div>
            </Col>

                <Col lg="9" md="9" sm="9">
                <div style={{marginBottom:20}}> 
                  <ButtonGroup>
                    <Button outline  color="warning" onClick={() => changeSpeed(article,lang,1)}>1x  </Button>
           
                    <Button outline  color="warning" onClick={() => changeSpeed(article,lang,0.75)}>3/4x</Button>
       
                    <Button outline  color="warning" onClick={() => changeSpeed(article,lang,0.66)}>2/3x</Button>
    
                    <Button outline  color="warning" onClick={() => changeSpeed(article,lang,0.50)}>1/2x</Button>
            
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

                  <div onMouseUp={() => translateSel(lang,art_id,mutate)} >
                    <h5><ReactMarkdown source={article} /></h5>
                  </div>

                </Col>

                <Col lg="2" md="2" sm="2">

                {translations.map((t,i) => 
                  <div key={i}>
                  <div style={{fontSize:18}}>{t.orig_text} - {t.trans_text}</div>
                  <hr />
                  </div>
                  )}
            </Col>
          </Row>

        </Col>
        
        </Row>
        </Container>
        </div>
    )
  }

export default Article
