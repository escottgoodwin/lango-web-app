import React,{Component} from "react";
import {
  Row,
  Col,
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_REC_ALL_QUERY } from '../ApolloQueries'

import ArtRecsAll from './ArtRecsAll'

class ArtRecs extends Component{

  render(){
    const { lang, flag, language } = this.props
    return(

      <Query  query={ARTICLE_REC_ALL_QUERY}
              variables={{ lang }}  >
            {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { articleRecommendationsAll } = data
 
            return (

              <Row >
                <Col md="12">
                { articleRecommendationsAll.length>0 &&
                  <ArtRecsAll articleRecommendationsAll={articleRecommendationsAll} lang={lang} flag={flag} language={language} />
                }
                </Col>
              </Row>
            )
          }}
       </Query>

      )
    }
  }

export default ArtRecs