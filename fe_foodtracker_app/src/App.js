import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table } from 'react-bootstrap';
import { Table } from 'reactstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Topcontrols from './components/Topcontrols';
import axios from 'axios';
import ModalAddItem from './components/ModalAddItem';
import ModalEditFood from './components/ModalEditFood';
import Foods from './components/Foods';
import Nutrifacts from './components/Nutrifacts';

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
        location: '',
        nutrifacts: ''
      },
      editFoodData: {
        id: '',
        item: '',
        quantity: '',
        pic: '',
        days_expiration: '',
        location: '',
        nutrifacts: ''
      },
      newFoodModal: false,
      editFoodModal: false,
      fridgeitems: [],
      food: {}
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
    this.sortFoods = this.sortFoods.bind(this);
    // this.getFood = this.getFood.bind(this);
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
          pic: '',
          nutrifacts: ''
        }
      });
    });
  }

  updateFood() {
    let {
      id,
      item,
      quantity,
      days_expiration,
      location,
      pic,
      nutrifacts
    } = this.state.editFoodData;
    axios
      .put('/foods/' + this.state.editFoodData.id, {
        item,
        quantity,
        days_expiration,
        location,
        pic,
        nutrifacts
      })
      .then(response => {
        // console.log(response.data);
        this.refreshFoods();

        this.setState({
          editFoodModal: false,
          editFoodData: {
            item: '',
            quantity: '',
            days_expiration: '',
            location: '',
            pic: '',
            nutrifacts: ''
          }
        });
      });
  }

  refreshFoods() {
    axios.get('/foods').then(response => {
      // console.log(response);
      this.setState({
        foods: response.data.foods
      });
    });
  }

  editFood(id, item, quantity, days_expiration, location, pic, nutrifacts) {
    // console.log(item);
    this.setState({
      editFoodData: {
        id,
        item,
        quantity,
        days_expiration,
        location,
        pic,
        nutrifacts
      },
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
      console.log(filtered);
      const fsort = (a, b) => {
        const genreA = a.item;
        const genreB = b.item;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      };

      this.setState({
        // foods: filtered
        foods: filtered.sort(fsort)
      });
    });
  }

  showPantry(rd) {
    axios.get('/foods').then(response => {
      // console.log(response.data.foods);
      const filtered = response.data.foods.filter(rd => {
        return rd.location == 'pantry';
      });
      console.log(filtered);
      const fsort = (a, b) => {
        const genreA = a.item;
        const genreB = b.item;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      };

      this.setState({
        // foods: filtered
        foods: filtered.sort(fsort)
      });
    });
  }

  showAll(rd) {
    axios.get('/foods').then(response => {
      // console.log(response.data.foods);
      const all = response.data.foods.map(rd => {
        return rd;
      });
      console.log(all);
      const fsort = (a, b) => {
        const genreA = a.item;
        const genreB = b.item;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      };

      this.setState({
        // foods: all
        foods: all.sort(fsort)
      });
    });
  }

  sortFoods(rd) {
    axios.get('/foods').then(response => {
      const tosort = response.data.foods;
      // console.log(tosort);
      const fsort = (a, b) => {
        const genreA = a.item;
        const genreB = b.item;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      };
      this.setState({
        foods: tosort.sort(fsort)
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
        {/* show foods */}
        <Foods
          foods={this.state.foods}
          editFood={this.editFood}
          deleteFood={this.deleteFood}
          sortFoods={this.sortFoods}
          getFood={this.getFood}
        />
        {/* Footer component */}
        <Footer className='logo1' />
      </div>
    );
  }
}

export default App;
