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
class ModalEditFood extends Component {
  render(props) {
    return (
      <div>
        <Modal
          className='modal'
          isOpen={this.props.editFoodModal}
          toggle={this.props.toggleEditFoodModal.bind(this)}
        >
          <ModalHeader toggle={this.props.toggleEditFoodModal.bind(this)}>
            Edit a food item
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                id='item'
                value={this.props.editFoodData.item}
                onChange={e => {
                  let { editFoodData } = this.props;
                  editFoodData.item = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='quantity'>Quantity</Label>
              <Input
                id='quantity'
                value={this.props.editFoodData.quantity}
                onChange={e => {
                  let { editFoodData } = this.props;
                  editFoodData.quantity = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='days'>Days</Label>
              <Input
                id='days'
                value={this.props.editFoodData.days_expiration}
                onChange={e => {
                  let { editFoodData } = this.props;
                  editFoodData.days_expiration = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='location'>Location</Label>
              <Input
                id='location'
                value={this.props.editFoodData.location}
                onChange={e => {
                  let { editFoodData } = this.props;
                  editFoodData.location = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='emoji'>Emoji</Label>
              <Input
                id='emoji'
                value={this.props.editFoodData.pic}
                onChange={e => {
                  let { editFoodData } = this.props;
                  editFoodData.pic = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.props.updateFood.bind(this)}>
              Update Item
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.props.toggleEditFoodModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalEditFood;
