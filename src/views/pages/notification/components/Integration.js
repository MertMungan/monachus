import React from 'react'
import { Row, Col } from 'reactstrap'
import FirebaseCard from './cards/FirebaseCard'
import SmtpCard from './cards/SmtpCard'

function integration() {
  return (
    <>
      <Row>
        <Col lg='6' sm='6'>
        <FirebaseCard/>
        </Col>
        <Col lg='6' sm='6'>
        <SmtpCard/>
        </Col>
      </Row>
    </>
  )
}

export default integration