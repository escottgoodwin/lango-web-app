import React,{Component} from "react";
import {
  Row,
  Col,
} from "reactstrap";
import moment from 'moment'

import { Query } from "react-apollo"
import { ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

import ArtRecsAll from './ArtRecsAll'

class ArtRecs extends Component{

  render(){
    const { lang, flag, language, date } = this.props
    return(

      <Query  query={ARTICLE_REC_DATE_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang, date }}  >
            {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { articleRecommendationsHistory } = data
 
            return (
              <>
              <Row>
                <Col>
                  <h4>{language} {moment(date).format('MMMM Do YYYY')}</h4>
                </Col>
              </Row>

              <Row >
                <Col md="12">
                { articleRecommendationsHistory.length>0 &&
                  <ArtRecsAll articleRecommendationsAll={articleRecommendationsHistory} lang={lang} flag={flag} language={language} />
                }
                </Col>
              </Row>
              </>
            )
          }}
       </Query>

      )
    }
  }

export default ArtRecs