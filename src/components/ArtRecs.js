import React,{Component} from "react";
import {Link} from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
} from "reactstrap";

import { Query } from "react-apollo"
import { ARTICLE_REC_QUERY } from '../ApolloQueries'

import LinkRec from './LinkRec'

class ArtRecs extends Component{

  render(){
    const { lang, flag, language } = this.props
    return(

      <Query  query={ARTICLE_REC_QUERY}
              variables={{ lang }}  >
        {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { articleRecommendations } = data
              console.log(articleRecommendations)
            return (

              <Row >
                <Col md="12">
                { articleRecommendations[0].recs.length>0 &&
                <>
                  <div >
                    <h5>{language} Recommendations</h5>
                  </div>

                  {
                    articleRecommendations.map((r,i) => 

                      <>
                        <div>
                          <h5>Cluster {i+1}</h5>
                        </div>
                        <div>
                          {r.recs.map(r => 
                            <LinkRec key={r.art_id} lang={lang} {...r} />
                          )}
                        </div>
                      </>
                    )
                  }
                  </>
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