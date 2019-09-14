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
import ModalAddItem from './components/ModalAddItem';
import ModalEditFood from './components/ModalEditFood';

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
    this.addFood = this.addFood.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showFridge = this.showFridge.bind(this);
    this.showPantry = this.showPantry.bind(this);
    this.toggleNewFoodModal = this.toggleNewFoodModal.bind(this);
    this.toggleEditFoodModal = this.toggleEditFoodModal.bind(this);
    this.refreshFoods = this.refreshFoods.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.editFood = this.editFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
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
      // console.log(response.data);
      let { foods } = this.state;

      foods.push(response.data.food);
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
    // return this.state.foods;
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
    // console.log(item);
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
      // console.log(response.data.foods);
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
      // console.log(response.data.foods);
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
      // console.log(response.data.foods);
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
        {/* top controls */}
        <Topcontrols
          toggleNewFoodModal={this.toggleNewFoodModal}
          showAll={this.showAll}
          showFridge={this.showFridge}
          showPantry={this.showPantry}
        />
        {/* ModalAddItem */}
        <ModalAddItem
          newFoodModal={this.state.newFoodModal}
          newFoodData={this.state.newFoodData}
          toggleNewFoodModal={this.toggleNewFoodModal}
          addFood={this.addFood}
        />
        {/* edit modal         */}
        <ModalEditFood
          editFoodModal={this.state.editFoodModal}
          editFoodData={this.state.editFoodData}
          toggleEditFoodModal={this.toggleEditFoodModal}
          updateFood={this.updateFood}
          refreshFoods={this.refreshFoods}
        />

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
