import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Form,
  Alert,
  Image
} from "react-bootstrap";

import PrototypeSearch from "./PrototypeSearch";
import PrototypeCategories from "./PrototypeCategories";
import axios from "axios";

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
    this.getSizeOptions();
  };

  componentDidMount() {
    this.fetchProductById();
  }

  fetchProductById = () => {
    let productId = this.props.match.params.id;
    axios.get(`http://localhost:8080/product/${productId}`).then(products => {
      let { data } = products;
      this.setState({ product: data });
    });
  };

  getSizeOptions = () => {
    let { product } = this.state;

    return product.stock
      ? product.stock.map((stockQuantity, index) => {
          switch (stockQuantity.quantity) {
            case stockQuantity.quantity < 1:
              return (
                <option key={index} disabled value={stockQuantity.size}>
                  {stockQuantity.size} Out Of Stock
                </option>
              );
            case stockQuantity.quantity < 5:
              return (
                <option key={index} value={stockQuantity.size}>
                  {stockQuantity.size} Low Stock
                </option>
              );
            default:
              return (
                <option key={index} value={stockQuantity.size}>
                  {stockQuantity.size}
                </option>
              );
          }
        })
      : null;
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

  addToBasket = (e, product) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      selectedSize: product.size
    });

    console.log(product);

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
        axios.patch(`http://localhost:8080/product/${this.state.product._id}`, {
          stock: [
            {
              size: this.state.selectedSize,
              quantity: newStock
            }
          ]
        });
        this.fetchProductById();

        allItems.push(shoe);
        localStorage.setItem("basket", JSON.stringify(allItems));

        this.props.history.push("/basket");
      }
    );
  };

  renderImage = product => {
    return (
      <Col className="text-center" md={12} xs={12}>
        <Image className="hero-image mb-3" src={product.images[0]} />
      </Col>
    );
  };

  render() {
    const { product } = this.state;
    console.log(product);

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={3} className="mb-3">
              <PrototypeSearch />
            </Col>
            <Col md={9} xs={12}>
              {product.images
                ? this.renderImage(product)
                : console.log("not true")}
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3 d-none d-md-block ">
              <PrototypeCategories />
            </Col>
            <Col xs={12} md={9}>
              <Col className="shoe-details pb-3 mb-3 text-center">
                <Col sm={3} lg={12}>
                  <p>Name: {product.name}</p>
                  <p>Description: {product.description}</p>
                  <p>Colour: {product.colour}</p>
                  <p>Price: £{product.price}</p>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Size:</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.selectedSize}
                        onChange={this.handleChange}
                      >
                        <option>Select a size</option>
                        {this.getSizeOptions()}
                      </Form.Control>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="outline-secondary"
                      onClick={e => this.addToBasket(e, product)}
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
