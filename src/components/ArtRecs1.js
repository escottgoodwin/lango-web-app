import React,{Component} from "react";
import {
  Row,
  Col,
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_REC_ALL_QUERY } from '../ApolloQueries'

import LinkRecMain from './LinkRecMain'

function sortDate(array){

  return array.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  })
}

class ArtRecs extends Component{

  render(){
    const { lang } = this.props
    return(

      <Query  query={ARTICLE_REC_ALL_QUERY}
              variables={{ lang }}  >
            {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { articleRecommendationsAll } = data
            const artRecsSorted = sortDate(articleRecommendationsAll)

            return (

              <Row >
                <Col md="12">
                { artRecsSorted.length>0 &&
                  artRecsSorted.map((a,i) => 
                    <LinkRecMain key={i} {...a} />
                  )
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