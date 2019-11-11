import React,{Component} from "react";

import Flag from 'react-world-flags'

import {
  Row,
  Col,
} from "reactstrap";
import moment from 'moment'

import LinkRecHistory from './LinkRecHistory'

import { Query } from "react-apollo"
import { ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

function sortDate(array){

  return array.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  })
}

class ArtRecsDate extends Component{

  render(){
    const { lang, flag, language, searchDate } = this.props
    return(
      <Query  query={ARTICLE_REC_DATE_QUERY}
          fetchPolicy={'cache-and-network'}
          variables={{ lang, date: searchDate }}  >
        {({ loading, error, data }) => {
        if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
        if (error) return <div>{JSON.stringify(error)}</div>

        const { articleRecommendationsHistory } = data
        const artRecsSorted = sortDate(articleRecommendationsHistory)
        return (
          <>
            <Row>
              <Col>
                <h5>{moment(searchDate).format('MMMM Do YYYY')}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
              <h4> <Flag code={flag} height="24" /> {articleRecommendationsHistory.length} {language} Recommendations</h4>
              </Col>
            </Row>

            <Row >
              <Col md="12">
                {artRecsSorted.map(r => 
                  <LinkRecHistory searchDate={searchDate} key={r.art_id} {...r} />
                )}             
              </Col>
            </Row>
          </>   
          )
        }}
    </Query>
      )
    
    }
  }


export default ArtRecsDate