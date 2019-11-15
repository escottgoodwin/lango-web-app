import React, { Component } from "react";

import {
  Row,
  Col,
  Container
} from "reactstrap"

import { Query } from "react-apollo"
import { PLAYLIST_QUERY } from '../ApolloQueries'

import LinkRecPlaylist from '../components/LinkRecPlaylist'

function sortDate(array){

  return array.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  })
}


class PlayList extends Component{

    render(){

    return(

          <div className="content">
          <Container >

            <Row >
              <Col md="12" >
              <div style={{marginTop:30}}>
              <Query  query={PLAYLIST_QUERY}
                    fetchPolicy={'cache-and-network'}
                  >
                {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { playList } = data

                const playListSorted = sortDate(playList )
    
                return (

                  <Row >
                    <Col md="12">

                      {
                        playListSorted.map((r) => <LinkRecPlaylist key={r.art_id} {...r} />)
                      }
              
                    </Col>
                  </Row>
                )
              }}
          </Query>
          </div>
          </Col>
        </Row>

          </Container>
          </div>
    )
    }
  }
  

export default PlayList
