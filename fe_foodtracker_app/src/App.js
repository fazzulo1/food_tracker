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
  Input,
  ButtonGroup
} from 'reactstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Topcontrols from './components/Topcontrols';
import axios from 'axios';
import Modalhead from './components/Modalhead';

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
        id: '',
        item: '',
        quantity: '',
        pic: '',
        days_expiration: '',
        location: ''
      },
      newFoodModal: false,
      editFoodModal: false,
      currentPage: 'home',
      fridgeitems: []
    };
    this.showAll = this.showAll.bind(this);
    this.showFridge = this.showFridge.bind(this);
    this.showPantry = this.showPantry.bind(this);
    this.toggleNewFoodModal = this.toggleNewFoodModal.bind(this);
    this.toggleEditFoodModal = this.toggleEditFoodModal.bind(this);
    this.addFood = this.addFood.bind(this);
  }

  componentWillMount() {
    this.refreshFoods();
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
    return this.state.foods;
  }

  updateFood() {
    let {
      id,
      item,
      quantity,
      days_expiration,
      location,
      pic
    } = this.state.editFoodData;
    axios
      .put('/foods/' + this.state.editFoodData.id, {
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

  refreshFoods() {
    axios.get('/foods').then(response => {
      console.log(response);
      this.setState({
        foods: response.data.foods
      });
    });
  }

  editFood(id, item, quantity, days_expiration, location, pic) {
    console.log(item);
    this.setState({
      editFoodData: { id, item, quantity, days_expiration, location, pic },
      editFoodModal: !this.state.editFoodModal
    });
  }

  deleteFood(id) {
    axios.delete('foods/' + id).then(response => {
      this.refreshFoods();
    });
  }

  showFridge(rd) {
    axios.get('/foods').then(response => {
      console.log(response.data.foods);
      const filtered = response.data.foods.filter(rd => {
        return rd.location == 'fridge';
      });
      this.setState({
        foods: filtered
      });
    });
  }

  showPantry(rd) {
    axios.get('/foods').then(response => {
      console.log(response.data.foods);
      const filtered = response.data.foods.filter(rd => {
        return rd.location == 'pantry';
      });
      this.setState({
        foods: filtered
      });
    });
  }

  showAll(rd) {
    axios.get('/foods').then(response => {
      console.log(response.data.foods);
      const all = response.data.foods.map(rd => {
        return rd;
      });
      this.setState({
        foods: all
      });
    });
  }

  render() {
    return (
      <div className='App container'>
        {/* Header component */}
        <Header className='logo' />
        {/* Header component */}
        {/* top controls */}
        <Topcontrols
          toggleNewFoodModal={this.toggleNewFoodModal}
          showAll={this.showAll}
          showFridge={this.showFridge}
          showPantry={this.showPantry}
        />
        {/* top controls */}
        <Modalhead
          newFoodModal={this.state.newFoodModal}
          newFoodData={this.state.newFoodData}
          toggleNewFoodModal={this.toggleNewFoodModal}
          addFood={this.addFood}
        />
        {/* <Modal
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
        </Modal> */}

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

        <Table size='sm' className='table'>
          <thead>
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
                  <td className='emoji'>{food.pic}</td>
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
                  <button
                    type='submit'
                    className='delete'
                    onClick={this.deleteFood.bind(this, food.id)}
                  >
                    ❌
                  </button>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* Footer component */}
        <Footer className='logo1' />
        {/* Footer component */}
      </div>
    );
  }
}

export default App;
