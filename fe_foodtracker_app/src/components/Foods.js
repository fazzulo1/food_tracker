import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Nutrifacts from './Nutrifacts';
class Foods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: {},
      isFoodSet: false
    };
    this.getFood = this.getFood.bind(this);
  }

  getFood(food) {
    this.setState({
      food: food,
      isFoodSet: true
    });
  }

  render() {
    return (
      <div>
        <Table size='sm' className='table'>
          <thead>
            <tr>
              <th onClick={this.props.sortFoods.bind(this)}>Item</th>
              <th>Quantity</th>
              <th>Days</th>
              <th>Location</th>
              {/* <th>Nutrifacts</th> */}
              <th>😋</th>
              <th>✍ || ❌</th>
            </tr>
          </thead>
          <tbody>
            {this.props.foods.map((food, index) => {
              return (
                <tr key={food.id}>
                  <td key={food.id} onMouseOver={() => this.getFood(food)}>
                    {food.item}
                  </td>
                  <td>{food.quantity}</td>
                  <td>{food.days_expiration}</td>
                  <td>{food.location}</td>
                  <td className='emoji'>{food.pic}</td>
                  <button
                    type='submit'
                    className='edit'
                    onClick={this.props.editFood.bind(
                      this,
                      food.id,
                      food.item,
                      food.quantity,
                      food.days_expiration,
                      food.location,
                      food.pic,
                      food.nutrifacts
                    )}
                  >
                    ✍
                  </button>
                  <button
                    type='submit'
                    className='delete'
                    onClick={this.props.deleteFood.bind(this, food.id)}
                  >
                    ❌
                  </button>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Table size='sm' className='table'>
          <Nutrifacts getFood={this.getFood} food={this.state.food} />
        </Table> */}
      </div>
    );
  }
}

export default Foods;
