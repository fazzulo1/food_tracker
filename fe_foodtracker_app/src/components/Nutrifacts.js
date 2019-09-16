import React, { Component } from 'react';
import { Modal, ModalBody, Card, CardImg } from 'reactstrap';
class Nutrifacts extends Component {
  render() {
    return (
      <div class='showNutrifacts'>
        <img
          // alt='F🍎🍊D TRACKER'
          width='200PX'
          src={this.props.food.nutrifacts}
        ></img>
      </div>
    );
  }
}
export default Nutrifacts;
