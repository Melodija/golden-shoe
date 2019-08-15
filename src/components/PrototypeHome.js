import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import PrototypeSearch from "./PrototypeSearch";
import PrototypeCategories from "./PrototypeCategories";

import "../styles/Prototype-styles.css";

function Prototype() {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={3} className="mb-3">
            <PrototypeSearch />
          </Col>
          <Col md={9} xs={12}>
            <Jumbotron fluid className="main-image mb-3 text-center">
              Promo Image
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-3 d-none d-md-block ">
            <PrototypeCategories />
          </Col>
          <Col xs={12} s={9} md={3}>
            <Col className="pr-0 shoe-image mb-3 text-center">Image 1</Col>
          </Col>
          <Col xs={12} s={9} md={3}>
            <Col className="pr-0 shoe-image mb-3 text-center">Image 2</Col>
          </Col>
          <Col xs={12} s={9} md={3}>
            <Col className="pr-0 shoe-image mb-3 text-center">Image 3</Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Prototype;
