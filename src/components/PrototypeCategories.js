import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import "../styles/Prototype-styles.css";

function PrototypeCategories() {
  return (
    <Col className="left-sidebar">
      <ListGroup variant="flush">
        <h6 className="text-center">Categories</h6>
        <Link to="#">Men's Sports</Link>
        <Link to="#">Men's Evening Wear</Link>
        <Link to="#">Men's Casual</Link>
        <Link to="#">Men's Slippers</Link>
        <Link to="#">Men's Sandals</Link>
        <Link to="#">Women's Sports</Link>
        <Link to="#">Women's Evening Wear</Link>
        <Link to="#">Women's Casual</Link>
        <Link to="#">Women's Slippers</Link>
      </ListGroup>
    </Col>
  );
}

export default PrototypeCategories;
