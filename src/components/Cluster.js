import React from "react";
import Flag from 'react-world-flags'
import {
  Row,
  Col,
} from "reactstrap";


import LinkRec from './LinkRec'

const Cluster = ({index,recs,flag,lang}) => 
    <>
    {recs.length>0 &&
        <div>
            <Row>
                <Col>
                    <h5><Flag code={flag} height="24" /> Cluster {index+1}</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    {recs.map(r => 
                        <LinkRec key={r.art_id} lang={lang} {...r} />
                    )}
                </Col>
            </Row>
        </div>
    }
    </>

export default Cluster
