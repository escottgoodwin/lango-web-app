import React,{Component} from "react";
import {
  Row,
  Col,
} from "reactstrap";
import Flag from 'react-world-flags'

import LinkRec from './LinkRec'

function sortDate(array){

  array.sort(function(a, b) {
    console.log(a.date)
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  })
}

class ArtRecsAll extends Component{
  state={
    articleRecommendationsAll:[]
  }

  

  componentDidMount(){
    const { articleRecommendationsAll } = this.props
    const artRecsSorted = sortDate(articleRecommendationsAll)
    this.setState({articleRecommendationsAll})
  }

  render(){
    const { lang, flag, language } = this.props
    const { articleRecommendationsAll } = this.state
    return(
          <>
            <div >
              <Row>
                <Col md="1">
                  <Flag code={flag} height="24" />
                </Col>
                <Col md="11">
                  <h5> {language} Recommendations - {articleRecommendationsAll.length}</h5>
                </Col>
              </Row>
              </div>

            {articleRecommendationsAll.map(r => 
              <LinkRec key={r.art_id} lang={lang} {...r} />
            )}
          </>   
      )
    }
  }

export default ArtRecsAll