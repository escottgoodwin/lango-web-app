import React,{Component} from "react";
import Calendar from 'react-calendar'
import Flag from 'react-world-flags'
import moment from 'moment'
import ArtRecsDate from '../components/ArtRecsDate'
import {
  Row,
  Col,
  Container,
} from "reactstrap";

class ArtRecDate extends Component{
  state={
    date: new Date(),
    searchDate: moment().format('YYYY-MM-DD'),
    lang:'',
    language:'',
    flag:'',
    fr:false,
    de:false,
    es:false,
  }

  onChangeDate = date => {
    const searchDate = moment(date).format('YYYY-MM-DD')
    this.setState({ date })
    this.setState({ searchDate })
}

onChangeLang = (lang, language, flag) => {
  this.setState({ lang, language, flag })
  if (lang === 'en'){
    this.setState({ en:true })
    this.setState({ es:false })
    this.setState({ fr:false })
    this.setState({ de:false })

  }
  if (lang === 'es'){
    this.setState({ en:false })
    this.setState({ es:true })
    this.setState({ fr:false })
    this.setState({ de:false })
  }
  if (lang === 'fr'){
    this.setState({ en:false })
    this.setState({ es:false })
    this.setState({ fr:true })
    this.setState({ de:false })
  }
  if (lang === 'de'){
    this.setState({ en:false })
    this.setState({ es:false })
    this.setState({ fr:false })
    this.setState({ de:true })
  }
}
  
  render(){
    const { lang, flag, language, date, searchDate } = this.state
    const { en_rec, de_rec, es_rec, fr_rec } = JSON.parse(localStorage.getItem('user'))
   
    return(
      <div className="content">
        <Container >
          <Row>
            <Col md="8">
              {lang &&
                <ArtRecsDate lang={lang} searchDate={searchDate} flag={flag} language={language}/>
              }
             
          </Col>
          <Col md="4">

            <div style={{paddingTop:40}}>     
           <Calendar
            onChange={this.onChangeDate}
            value={date}
            />
            </div>  

            <Row>
              <Col>
              <center>
              {en_rec &&
                <Flag style={{margin:5}} code="gb" height="36" onClick={() => this.onChangeLang('en','English',"gb")}/>
              
              }
              {fr_rec &&
              <Flag style={{margin:5}} code="fr" height="36" onClick={() => this.onChangeLang('fr','French',"fr")}/>
              
            }
            {de_rec &&
              <Flag style={{margin:5}} code="de" height="36" onClick={() => this.onChangeLang('de','German',"de")}/>
             
            }
            {es_rec &&
              <Flag style={{margin:5}} code="es"height="36" onClick={() => this.onChangeLang('es','Spanish',"es")}/>

            }

               
             </center>
              </Col>
            </Row>
          </Col>
          </Row>
            
         </Container>
      </div>  
      )
    }
  }

export default ArtRecDate