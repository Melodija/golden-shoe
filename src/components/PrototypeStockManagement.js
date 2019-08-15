import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import "../styles/Prototype-styles.css";

class PrototypeStockManagement extends Component {
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
        this.setState({ product: data });
      });
  };

  getSizes = () => {
    if (this.state.product.stock != null) {
      return this.state.product.stock.map(item => {
        if (item.stock <= 0) {
          return (
            <option disabled value={item.size}>
              {item.size} Out Of Stock
            </option>
          );
        } else if (item.stock <= 5) {
          return <option value={item.size}>{item.size} Low Stock</option>;
        }
        return <option value={item.size}>{item.size}</option>;
      });
    }
  };

  renderStock = () => {
    if (this.state.product != null) {
      return this.state.product.map(product => {
        return (
          <tr className="text-center">
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.colour}</td>

            <td>
              <Table>
                <tr>
                  <th>Size</th>
                  <th>Stock</th>
                </tr>
                {this.renderSizesWithStock(product)}
              </Table>
            </td>
          </tr>
        );
      });
    }
  };

  renderSizesWithStock = product => {
    return product.stock.map(sizes => {
      return (
        <tr>
          <td>{sizes.size}</td>
          <td>{sizes.quantity}</td>
        </tr>
      );
    });
  };

  render() {
    const shoe = this.state.product;
    console.log(this.state.product);

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12}>
              <Table bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Colour</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>{this.renderStock()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default PrototypeStockManagement;
