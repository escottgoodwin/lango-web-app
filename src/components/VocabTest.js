import React,{Component} from "react"
import { Link } from 'react-router-dom'
import Flag from 'react-world-flags'
import { FaLongArrowAltRight } from 'react-icons/fa';

import {
  Row,
  Col,
  Input,
  Button,
  Alert
} from "reactstrap";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class VocabTest extends Component{

  state={
    guess:'',
    feedback:false,
    newQuestion:'',
    newAnswer:'', 
    curQuestion:'',
    curAnswer:'',
    correct:false,
    feedbackColor:'danger',
    vocab:[],
    language:'',
    native_lang:'',
    art_id:''
  }

  componentDidMount(){
    const { vocab } = this.props
    this.setState({vocab})
    const rnd = getRandomInt(vocab.length)
    const newQuestion = vocab[rnd]
    this.setState({newQuestion:newQuestion.orig_text, newAnswer:newQuestion.trans_text})
    const {native_lang} = JSON.parse(localStorage.getItem('user'))

    if (native_lang === 'en'){
      this.setState({language:'English',native_lang:'gb'})
    }
    if (native_lang === 'es'){
      this.setState({language:'Spanish',native_lang})
    }
    if (native_lang === 'fr'){
      this.setState({language:'French',native_lang})
    }
    if (native_lang === 'de'){
      this.setState({language:'German',native_lang})
    }

  }

  checkVocab = (question, answer, guess, vocab) => {
    this.setState({feedback:true,curAnswer:answer,curQuestion:question})
    if (answer.toLowerCase()===guess.toLowerCase()){
      this.setState({correct:true, feedbackColor:'success'})
    } else {
      this.setState({correct:false, feedbackColor:'danger'})
    }
    const newVocab = vocab.filter(v => v.trans_text!==answer)

    this.setState({vocab:newVocab})
    const rnd = getRandomInt(newVocab.length)
    const newQuestion = newVocab[rnd]

    this.setState({newQuestion: newQuestion['orig_text'], newAnswer: newQuestion['trans_text'], art_id: newQuestion['art_id'], guess:''})
  }

  toggle = () => this.setState({correct:false, feedback:false, answer:''})

  render(){

    const { 
      guess,
      feedback,
      newQuestion,
      newAnswer, 
      curQuestion,
      curAnswer, 
      correct,
      feedbackColor,
      vocab,
      language,
      art_id,
      native_lang
      } = this.state
      const lang = 'fr'
          
    return(
        <>

          <Row >
            <Col >
              <Flag code="fr" height="48" />  <FaLongArrowAltRight style={{fontSize:56}}/> <Flag code={native_lang} height="48" />
            </Col>
          </Row>

          <Row >
            <Col >
            <h5 style={{marginTop:20,marginBottom:20}}>What does <span style={{color:"#17a2b8"}}> {newQuestion} </span> mean in <span style={{color:"#28a745"}}>{language}</span>?</h5>
            </Col>
          </Row>

          <Row fluid='true'>
          <Col md="6">
    
            <Input onChange={e => this.setState({ guess: e.target.value })} value={guess} placeholder="Translation" />
          
          </Col>
          </Row>
       
          <Row fluid='true'>
          <Col >
            <Button onClick={() => this.checkVocab(newQuestion, newAnswer, guess, vocab)} color="primary" outline >
              Submit
            </Button>
          </Col>
          </Row>

        <Row>
          <Col md="6">

              <Alert color={feedbackColor} isOpen={feedback} toggle={this.toggle}>
                
                 <div style={{fontSize:18}}>Your answer was {correct ? 'correct' : 'incorrect' }.</div>
                 <div style={{fontSize:18}}>{curQuestion} means {curAnswer}.</div>
                
                <Link 
                  to={{ 
                  pathname: '/admin/article', 
                  state: {
                    art_id: art_id,
                    lang
                  }
                  }}><div style={{color:'#3A7891'}}>Original Article</div>
              </Link>
             
              
              </Alert>

          </Col>
        </Row>
            
        
        </>


    )
  }

}

export default VocabTest
