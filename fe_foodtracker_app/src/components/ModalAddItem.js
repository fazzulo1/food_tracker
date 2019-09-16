import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
class ModalAddItem extends Component {
  render(props) {
    return (
      <div>
        <Modal
          className='modal'
          isOpen={this.props.newFoodModal}
          toggle={this.props.toggleNewFoodModal.bind(this)}
        >
          <ModalHeader toggle={this.props.toggleNewFoodModal.bind(this)}>
            Add a food item
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                id='item'
                value={this.props.newFoodData.item}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.item = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='quantity'>Quantity</Label>
              <Input
                id='quantity'
                value={this.props.newFoodData.quantity}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.quantity = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='days'>Days</Label>
              <Input
                id='days'
                value={this.props.newFoodData.days_expiration}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.days_expiration = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='location'>Location</Label>
              <Input
                id='location'
                value={this.props.newFoodData.location}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.location = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='nutrifacts'>NutriFacts</Label>
              <Input
                id='nutrifacts'
                value={this.props.newFoodData.nutrifacts}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.nutrifacts = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='emoji'>Emoji</Label>
              <Input
                id='emoji'
                value={this.props.newFoodData.pic}
                onChange={e => {
                  let { newFoodData } = this.props;
                  newFoodData.pic = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.props.addFood.bind(this)}>
              Add Item
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.props.toggleNewFoodModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalAddItem;
