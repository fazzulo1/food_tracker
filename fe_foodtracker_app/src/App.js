import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table } from 'react-bootstrap';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      newFoodData: {
        item: '',
        quantity: '',
        pic: '',
        days_expiration: '',
        location: ''
      },
      editFoodData: {
        item: '',
        quantity: '',
        pic: '',
        days_expiration: '',
        location: ''
      },
      newFoodModal: false,
      editFoodModal: false
    };
  }

  componentDidMount() {
    this.getFoods();
  }

  async getFoods() {
    const response = await axios.get('/foods');
    console.log(response);
    const data = response.data.foods;
    this.setState({
      foods: data
    });
  }

  toggleNewFoodModal() {
    this.setState({
      newFoodModal: !this.state.newFoodModal
    });
  }

  toggleEditFoodModal() {
    this.setState({
      newFoodModal: !this.state.newFoodModal
    });
  }

  addFood() {
    axios.post('/foods', this.state.newFoodData).then(response => {
      console.log(response.data);
      let { foods } = this.state;

      foods.push(response.data);
      this.setState({
        foods,
        newFoodModal: false,
        newFoodData: {
          item: '',
          quantity: '',
          days_expiration: '',
          location: '',
          pic: ''
        }
      });
    });
  }

  // componentDidMount() {
  //   this.refreshFoods();
  // }

  updateFood() {
    let {
      item,
      quantity,
      days_expiration,
      location,
      pic
    } = this.state.editFoodData;
    axios
      .put('/foods' + this.state.editFoodData.id, {
        item,
        quantity,
        days_expiration,
        location,
        pic
      })
      .then(response => {
        console.log(response.data);
        this.refreshFoods();

        this.setState({
          editFoodModal: false,
          editFoodData: {
            item: '',
            quantity: '',
            days_expiration: '',
            location: '',
            pic: ''
          }
        });
      });
  }

  async refreshFoods() {
    const response = await axios.get('/foods');
    console.log(response);
    const data = response.data.foods;
    this.setState({
      foods: data
    });
  }

  editFood(id, item, quantity, days_expiration, location, pic) {
    console.log(item);
    this.setState({
      editFoodData: { item, quantity, days_expiration, location, pic },
      editFoodModal: !this.state.editFoodModal
    });
  }

  render() {
    return (
      <div className='App container'>
        {/* Header comonent */}
        <header>FOOD TRACKER APP</header>
        <Button
          color='primary'
          className='addButton'
          onClick={this.toggleNewFoodModal.bind(this)}
        >
          Add a food item
        </Button>
        <Modal
          className='modal'
          isOpen={this.state.newFoodModal}
          toggle={this.toggleNewFoodModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewFoodModal.bind(this)}>
            Add a food item
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                id='item'
                value={this.state.newFoodData.item}
                onChange={e => {
                  let { newFoodData } = this.state;
                  newFoodData.item = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='quantity'>Quantity</Label>
              <Input
                id='quantity'
                value={this.state.newFoodData.quantity}
                onChange={e => {
                  let { newFoodData } = this.state;
                  newFoodData.quantity = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='days'>Days</Label>
              <Input
                id='days'
                value={this.state.newFoodData.days_expiration}
                onChange={e => {
                  let { newFoodData } = this.state;
                  newFoodData.days_expiration = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='location'>Location</Label>
              <Input
                id='location'
                value={this.state.newFoodData.location}
                onChange={e => {
                  let { newFoodData } = this.state;
                  newFoodData.location = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='emoji'>Emoji</Label>
              <Input
                id='emoji'
                value={this.state.newFoodData.pic}
                onChange={e => {
                  let { newFoodData } = this.state;
                  newFoodData.pic = e.target.value;
                  this.setState({ newFoodData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.addFood.bind(this)}>
              Add Item
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.toggleNewFoodModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* head component  */}

        {/* edit modal         */}
        <Modal
          className='modal'
          isOpen={this.state.editFoodModal}
          toggle={this.toggleEditFoodModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditFoodModal.bind(this)}>
            Edit a food item
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                id='item'
                value={this.state.editFoodData.item}
                onChange={e => {
                  let { editFoodData } = this.state;
                  editFoodData.item = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='quantity'>Quantity</Label>
              <Input
                id='quantity'
                value={this.state.editFoodData.quantity}
                onChange={e => {
                  let { editFoodData } = this.state;
                  editFoodData.quantity = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='days'>Days</Label>
              <Input
                id='days'
                value={this.state.editFoodData.days_expiration}
                onChange={e => {
                  let { editFoodData } = this.state;
                  editFoodData.days_expiration = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='location'>Location</Label>
              <Input
                id='location'
                value={this.state.editFoodData.location}
                onChange={e => {
                  let { editFoodData } = this.state;
                  editFoodData.location = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='emoji'>Emoji</Label>
              <Input
                id='emoji'
                value={this.state.editFoodData.pic}
                onChange={e => {
                  let { editFoodData } = this.state;
                  editFoodData.pic = e.target.value;
                  this.setState({ editFoodData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.updateFood.bind(this)}>
              Update Item
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.toggleEditFoodModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* edit modal  */}

        <Table bordered size='sm' className='table'>
          <thead>
            <tr>
              <th className='head' colSpan='6'>
                F<span>🍎🍏D</span> TRACKER
              </th>
            </tr>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Days</th>
              <th>Location</th>
              <th>😋</th>
              <th>✍ || ❌</th>
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food, index) => {
              return (
                <tr key={food.id}>
                  <td>{food.item}</td>
                  <td>{food.quantity}</td>
                  <td>{food.days_expiration}</td>
                  <td>{food.location}</td>
                  <td>{food.pic}</td>
                  <button
                    type='submit'
                    className='edit'
                    onClick={this.editFood.bind(
                      this,
                      food.id,
                      food.item,
                      food.quantity,
                      food.days_expiration,
                      food.location,
                      food.pic
                    )}
                  >
                    ✍
                  </button>
                  <button type='submit' className='delete'>
                    ❌
                  </button>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
