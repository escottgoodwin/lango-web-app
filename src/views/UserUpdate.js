import React,{Component} from "react";

import {
  Container,
} from "reactstrap";

import UpdateLangs from '../components/UpdateLangs'
import UpdateUser from '../components/UpdateUser'
import ResetPassword from '../components/ResetPassword'

import { Query } from "react-apollo"
import { USER_QUERY } from '../ApolloQueries'

class UserUpdate extends Component{

  render(){
          
    return(

      <Query query={USER_QUERY} >
        {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#F4F3EF'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>
                 
            return (                

              <div className="content">
                
                <Container >

                  <UpdateLangs {...data.user} />

                  <hr />

                  <UpdateUser {...data.user} />

                  <hr />

                  <ResetPassword {...data.user} />

              </Container>
              </div>
           

            )
          }}
        </Query>
    )
  }

}

export default UserUpdate
