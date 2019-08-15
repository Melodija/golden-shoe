import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import PrototypeSearch from "./PrototypeSearch";
import PrototypeCategories from "./PrototypeCategories";

import "../styles/Prototype-styles.css";

class PrototypeProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      selectedSize: null
    };
  }

  handleChange = e => {
    this.setState({ selectedSize: e.target.value });
    this.getSizes();
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("http://localhost:8080/product")
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ product: data[0] });
      });
  };

  getSizes = () => {
    if (this.state.product.stock != null) {
      return this.state.product.stock.map(item => {
        if (item.quantity <= 0) {
          return (
            <option disabled value={item.size}>
              {item.size} Out Of Stock
            </option>
          );
        } else if (item.quantity <= 5) {
          return <option value={item.size}>{item.size} Low Stock</option>;
        }
        return <option value={item.size}>{item.size}</option>;
      });
    }
  };

  throwAlert = () => {
    if (this.state.alert) {
      return (
        <Alert
          variant="secondary"
          className="mt-3 alert-close"
          onClose={() => this.setState({ alert: false })}
          dismissible
        >
          Added to basket
        </Alert>
      );
    }
  };

  addToBasket = e => {
    e.preventDefault();

    let index = this.state.product.stock.findIndex(item => {
      return this.state.selectedSize == item.size;
    });

    let newStock = this.state.product.stock[index].quantity - 1;

    const allItems = JSON.parse(localStorage.getItem("basket")) || [];

    const shoe = {
      name: this.state.product.name,
      size: this.state.selectedSize,
      price: this.state.product.price,
      image: this.state.product.images[0]
    };
    this.setState(
      prevState => ({
        stock: prevState.product.stock.map(size =>
          size.key == this.state.selectedSize
            ? { ...size, stock: newStock }
            : size
        )
      }),
      () => {
        fetch("http://localhost:8080/product/" + this.state.product._id, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            stock: [
              {
                size: this.state.selectedSize,
                quantity: newStock
              }
            ]
          })
        });
        this.fetchData();

        allItems.push(shoe);
        localStorage.setItem("basket", JSON.stringify(allItems));

        this.props.history.push("/basket");
      }
    );
  };

  render() {
    const shoe = this.state.product;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={3} className="mb-3">
              <PrototypeSearch />
            </Col>
            <Col md={9} xs={12}>
              <Jumbotron fluid className="main-image mb-3 text-center">
                Image of product{" "}
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3 d-none d-md-block ">
              <PrototypeCategories />
            </Col>
            <Col xs={12} md={9}>
              <Col className="shoe-details pb-3 mb-3 text-center">
                <Col sm={3} lg={12}>
                  <p>Name: {shoe.name}</p>
                  <p>Description: {shoe.description}</p>
                  <p>Colour: {shoe.colour}</p>
                  <p>Price: £{shoe.price}</p>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Size:</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.selectedSize}
                        onChange={this.handleChange}
                      >
                        <option>Select a size</option>
                        {this.getSizes()}
                      </Form.Control>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="outline-secondary"
                      onClick={this.addToBasket}
                    >
                      Add To Basket
                    </Button>
                  </Form>
                  {this.throwAlert()}
                </Col>
              </Col>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default PrototypeProduct;
