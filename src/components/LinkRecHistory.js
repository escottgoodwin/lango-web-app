import React from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
  Button
} from "reactstrap";

import { Mutation } from "react-apollo"
import { ADD_PLAYLIST_MUTATION, REMOVE_PLAYLIST_MUTATION, ARTICLE_REC_DATE_QUERY } from '../ApolloQueries'

const LinkRecHistory = ({ lang, art_id, date, title, playlist, searchDate }) => 

    <Row>
      <Col md="1">
      {playlist ? 

        <Mutation
          mutation={REMOVE_PLAYLIST_MUTATION}
          variables={{ art_id }}
          refetchQueries={() => {
            return [{
              query: ARTICLE_REC_DATE_QUERY,
              variables: { lang, date: searchDate },
              fetchPolicy: 'cache-and-network'
            }];
          }}
          >
          {mutation => (
            <Button onClick={mutation} size="sm" color="success">PL</Button>
          )}
        </Mutation>
         
         :

         <Mutation
          mutation={ADD_PLAYLIST_MUTATION}
          variables={{ art_id }}
          refetchQueries={() => {
            return [{
              query: ARTICLE_REC_DATE_QUERY,
              variables: { lang, date: searchDate },
              fetchPolicy: 'cache-and-network'
            }];
          }}
          >
          {mutation => (
            <Button onClick={mutation} size="sm" outline color="success">PL</Button>
          )}
        </Mutation>
      }
      </Col>
      <Col md="11">

      <div key={art_id}>
        <div>{moment(date).format('MMMM Do YYYY')}</div>
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
                     

export default LinkRecHistory