import React,{Component} from "react";

import {
  Container,
  Row,
  Col
} from "reactstrap";

import VocabTest from '../components/VocabTest'


import { Query } from "react-apollo"
import { VOCAB_QUERY } from '../ApolloQueries'

class Vocab extends Component{

  render(){
          
    return(

      <Query query={VOCAB_QUERY} >
        {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { translations } = data
                 
            return (                

              <div className="content">
                
                <Container >

                <Row >
                  <Col >
                  <div style={{fontSize:18,paddingTop:30,paddingBottom:30}}>Translate foreign words into your native language.</div>
                  </Col>
                </Row>

                <Row >
                  <Col >
                    <VocabTest vocab={translations}/>
                  </Col>
                </Row>

              </Container>
              </div>

            )
          }}
        </Query>
    )
  }

}

export default Vocab
