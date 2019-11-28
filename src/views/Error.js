import React from "react";

import {
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

const Error = ({message}) =>      

        <div className="content">
          <Container >
            <Row >
              <Col >
              <Alert color="danger" style={{margin:50}}>
  
              <div style={{fontSize:36,paddingTop:30,paddingBottom:10, textAlign: 'center',}}>
                Error!
              </div>
              <hr/>
              <div style={{fontSize:24,paddingTop:10,paddingBottom:30}}>
                {message}
              </div>
              </Alert>
              </Col>
            </Row>
          </Container>
        </div>

export default Error
