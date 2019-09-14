import React, { Component } from 'react';
import { Table } from 'reactstrap';
class Foods extends Component {
  render(props) {
    return (
      <div>
        <Table size='sm' className='table'>
          <thead>
            <tr>
              <th onClick={this.props.sortFoods.bind(this)}>Item</th>
              <th>Quantity</th>
              <th>Days</th>
              <th>Location</th>
              <th>😋</th>
              <th>✍ || ❌</th>
            </tr>
          </thead>
          <tbody>
            {this.props.foods.map((food, index) => {
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
                    onClick={this.props.editFood.bind(
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
                    onClick={this.props.deleteFood.bind(this, food.id)}
                  >
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

export default Foods;
