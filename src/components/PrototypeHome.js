import React, { Component, Fragment } from "react";
import { Container, Row, Col, Image, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

import PrototypeSearch from "./PrototypeSearch";
import PrototypeCategories from "./PrototypeCategories";
import HeroImage from "../assets/hero_image.jpg";
import axios from "axios";

import "../styles/Prototype-styles.css";

class Prototype extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  fetchData = () => {
    axios.get("http://localhost:8080/product").then(products => {
      const { data } = products;
      this.setState({ products: data });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  renderImages() {
    return this.state.products.map(product => (
      <Col xs={6} s={9} md={3}>
        <Col className="pr-0 shoe-image mb-3 text-center">
          <Link to={`/product/${product._id}`}>
            <Image className="promo-image" src={product.images[0]} />
          </Link>
          <p className="text-muted">
            <small>{product.name}</small>
          </p>
        </Col>
      </Col>
    ));
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col md={3} className="mb-3">
              <PrototypeSearch />
            </Col>
            <Col md={9} xs={12}>
              <Jumbotron
                fluid
                className="hero-image mb-3 text-center "
                style={{ backgroundImage: `url(${HeroImage})` }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3 d-none d-md-block ">
              <PrototypeCategories />
            </Col>
            {this.state.products ? this.renderImages() : null}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Prototype;
