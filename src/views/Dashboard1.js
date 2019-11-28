import React from "react"
import Flag from 'react-world-flags'
import { Route, Switch, Link } from "react-router-dom"

import {
  Row,
  Col,
  Container
} from "reactstrap";

import ArtRecs from '../components/ArtRecs2'
import ArtRecsBlank from '../components/ArtRecsBlank'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (

    <div className="content">
    <Container >
    <Row>
      <Col>
      <center>
      <table style={{width:'100%'}}>
        <tbody>
          <tr>

          {user.en_rec && 
            <td>
              <Link to={{
                pathname: '/admin/dashboard/english',
                state: {
                  lang: 'en'
                }
              }}>
                <h4> <Flag code="gb" height="30" /> English </h4>
            </Link >
          <div>
            </div>
            </td>
            }

            {user.fr_rec && 
            <td>

              <Link to={{
                pathname: '/admin/dashboard/french',
                state: {
                  lang: 'fr'
                }
              }}>
                  <h4> <Flag code="fr" height="30" /> French</h4>
            </Link >

            </td>
            }

          {user.de_rec && 
            <td>
              <Link to={{
                pathname: '/admin/dashboard/german',
                state: {
                  lang: 'de'
                }
              }}>
                  <h4> <Flag code="de" height="30" /> German</h4>
            </Link >
          
            </td>
            }

        {user.es_rec && 
            <td>
              <Link to={{
                pathname: '/admin/dashboard/spanish',
                state: {
                  lang: 'es'
                }
              }}>
                <h4> <Flag code="es" height="30" /> Spanish</h4>
            </Link >

            </td>
            }

          </tr>
        </tbody>
      </table>
      </center>
      </Col>


    </Row>
      <hr />

      <Row fluid='true'>
        <Col md="12" >
        <Switch>
            
          <Route path="/admin/dashboard/french" component={ArtRecs}/> 
          <Route path="/admin/dashboard/german" component={ArtRecs}/> 
          <Route path="/admin/dashboard/english" component={ArtRecs}/> 
          <Route path="/admin/dashboard/spanish" component={ArtRecs}/>  
          <Route exact path="/admin/dashboard" component={ArtRecsBlank}/> 

        </Switch>
        </Col>
      </Row>

    </Container>
    </div>
  )
}
  
export default Dashboard;
