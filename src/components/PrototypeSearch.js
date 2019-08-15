import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import "../styles/Prototype-styles.css";

function PrototypeSearch() {
  return (
    <Col className="left-sidebar">
      <Form>
        <Form.Group className="p2">
          <Form.Label>Keyword</Form.Label>

          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option>-- Select Category --</option>
            <option>Womens</option>
            <option>Mens</option>
            <option>Children's</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="text-center">
          <Button size="sm" variant="outline-secondary">
            Search
          </Button>
        </Form.Group>
      </Form>
    </Col>
  );
}

export default PrototypeSearch;
