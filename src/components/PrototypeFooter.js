import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

import "../styles/Prototype-styles.css";

class PrototypeFooter extends Component {
  componentDidMount() {
    addResponseMessage(
      "Thank you for contacting Golden Shoe customer services. How may we assist you today?"
    );
  }

  handleNewUserMessage = newMessage => {
    this.checkUserMessage(newMessage);
  };

  checkUserMessage = message => {
    if (message.includes("return")) {
      addResponseMessage(
        "For a return you need to fill out a return slip. One has been generated for you here: ....."
      );
    } else if (message.includes("delivery")) {
      addResponseMessage(
        "Delivery times are one week. We ship once every Tuesday at 3pm."
      );
    } else if (message.includes("bye") || message.includes("thanks")) {
      addResponseMessage(
        "Thank you for contacting the Golden Shoe company. We hope you have a pleasant day."
      );
    } else {
      addResponseMessage(
        "Let me forward you to our customer service representatives."
      );
    }
  };

  render() {
    return (
      <Container className="sticky-bottom footer-topline footer-text">
        <Row className="footer text-center">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            subtitle="Feel free to ask us anything!"
          />

          <Col xs={3}>
            Shipping
            <p>
              Items are shipped every Tuesday at 3pm. The estimated time for
              delivery is 1 week.If you have not received your product in two
              weeks, call 07123456789
            </p>
          </Col>
          <Col xs={3}>
            Contact
            <p>For more information, call us on one of the following: ...</p>
          </Col>
          <Col xs={3}>
            Gift Wrapping
            <p>Gift wrapping available at checkout</p>
          </Col>
          <Col xs={3}>
            Shopping Cart
            <p>
              Our shopping cart will store your items if you choose not to
              purchase these at this moment. To learn more about the shopping
              cart process click here: ....
            </p>
          </Col>
        </Row>
        <Row className="footer mt-2 p-2">
          <Col>Home | Support | My Account | The Store | Contact</Col>
        </Row>
      </Container>
    );
  }
}

export default PrototypeFooter;
