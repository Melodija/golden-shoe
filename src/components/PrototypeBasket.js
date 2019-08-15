import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Cancel from "../images/x.png";

import "../styles/PrototypeBasket-styles.css";

class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoes: [],
      giftWrap: false
    };
  }

  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"));

    this.setState({
      shoes: basket
    });
  }

  calculateSubTotal = () => {
    if (this.state.shoes != null) {
      return this.state.shoes.reduce((total, item) => {
        return (total += item.price);
      }, 0.0);
    }
    return 0;
  };

  calculateTotal = (subtotal, delivery, giftWrap) => {
    if (giftWrap) {
      return subtotal + delivery + 1.0;
    }
    return subtotal + delivery;
  };

  removeItem = index => {
    let arr = [...this.state.shoes];
    arr.splice(index, 1);
    this.setState({ shoes: arr });
    localStorage.setItem("basket", JSON.stringify(arr));
  };

  basketOfItems = () => {
    if (this.state.shoes == null || this.state.shoes.length < 1) {
      return (
        <div className="basket-details text-center">
          There are no items in your basket
        </div>
      );
    }
    return this.state.shoes.map((item, index) => {
      return (
        <Row className="basket-item mb-3 mr-2" key={item.id}>
          <Col>
            <Image className="basket-image" src={item.image} />
          </Col>
          <Col className="basket-details basket-details_text">
            <Row>{item.name}</Row>
            <Row>Size: {item.size}</Row>
            <Row>Price: £{item.price}</Row>
          </Col>
          <Col className="basket-details basket-details_right mb-3 mt-2">
            <Image
              className="cancel-image "
              src={Cancel}
              onClick={() => this.removeItem(index)}
            />
          </Col>
        </Row>
      );
    });
  };

  handleChange = e => {
    this.setState({ giftWrap: !this.state.giftWrap });
  };

  askGiftWrap = () => {
    if (this.state.shoes != null && this.state.shoes.length > 0) {
      return (
        <Row className="giftwrap">
          Would you like this order to be gift wrapped? (£1.00 extra)
          <Form.Check type="checkbox" onChange={this.handleChange} />
        </Row>
      );
    }

    return null;
  };

  wantsGiftWrap = () => {
    if (this.state.giftWrap) {
      return "£ 1.00";
    }
    return "N/A";
  };

  checkout = e => {
    e.preventDefault();

    localStorage.removeItem("basket");
    this.props.history.push("/");
  };

  render() {
    const subTotal = this.calculateSubTotal();
    const delivery = 5;

    return (
      <Container className="basket-container">
        <Row>
          <Col sm="7">
            {this.basketOfItems()}
            {this.askGiftWrap()}
          </Col>
          <Col sm="5" className="basket-summary basket-details">
            <h2 className="basket-summary_title text-center">Summary</h2>
            <Row>
              <Col className="ml-4">
                <ListGroup.Item className="basket-summary_list">
                  Subtotal:
                </ListGroup.Item>
                <ListGroup.Item className="basket-summary_list">
                  Delivery
                </ListGroup.Item>
                <ListGroup.Item className="basket-summary_list">
                  Gift Wrap
                </ListGroup.Item>
              </Col>
              <Col className="mr-4">
                <ListGroup className="text-right">
                  <ListGroup.Item className="basket-summary_list">
                    £ {this.calculateSubTotal()}
                  </ListGroup.Item>
                  <ListGroup.Item className="basket-summary_list">
                    £ {delivery}
                  </ListGroup.Item>
                  <ListGroup.Item className="basket-summary_list">
                    {this.wantsGiftWrap()}
                  </ListGroup.Item>
                  <ListGroup.Item className="basket-summary_list" />
                </ListGroup>
              </Col>
            </Row>
            <Row className="basket-summary_total mr-4 ml-4">
              <Col className="basket-summary_list_padding">
                <ListGroup.Item className="basket-summary_list font-weight-bold">
                  Total: £{" "}
                  {this.calculateTotal(subTotal, delivery, this.state.giftWrap)}
                </ListGroup.Item>
              </Col>
              <Col className="basket-summary_list_padding">
                <ListGroup.Item className="basket-summary_list font-weight-bold text-right" />
              </Col>
            </Row>
            <Button
              block
              className="basket-form_submit"
              variant="light"
              type="submit"
              onClick={this.checkout}
            >
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Basket;
