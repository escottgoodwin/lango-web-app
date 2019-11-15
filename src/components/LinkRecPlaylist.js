import React from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'
import Flag from 'react-world-flags'
import {
  Row,
  Col,
  Button
} from "reactstrap";

import { Mutation } from "react-apollo"
import { REMOVE_PLAYLIST_MUTATION, PLAYLIST_QUERY } from '../ApolloQueries'

const LinkRecPlaylist = ({ lang, art_id, date, title, playlist, searchDate }) => 
  <>
    <Row>
      <Col md="1">

        <Mutation
        mutation={REMOVE_PLAYLIST_MUTATION}
        variables={{ art_id }}
        refetchQueries={() => {
          return [{
            query: PLAYLIST_QUERY    
          }];
        }}
        >
        {mutation => (
          <Button  onClick={mutation}  color="danger">X</Button>
        )}
        </Mutation>
         
      </Col>
      <Col md="11">

      <div  key={art_id}>
        <div> <Flag code={lang} height="12" /> {moment(date).format('MMMM Do YYYY')}  </div> 
        <div>
          <Link 
              to={{ 
              pathname: '/admin/article', 
              state: {
                art_id: art_id,
                lang
              }
              }}>
            <div style={{color:'#3A7891'}}><h5 >{title}</h5></div>
          </Link>
          </div>
        </div>
        
        </Col>
    </Row>
    <hr />
    </>
                     

export default LinkRecPlaylist