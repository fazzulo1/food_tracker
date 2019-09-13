import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class Topcontrols extends Component {
  render(props) {
    return (
      <div>
        <ButtonGroup>
          <Button
            color='primary'
            className='addButton'
            onClick={this.props.toggleNewFoodModal.bind(this)}
          >
            Add a food item
          </Button>
          <Button
            color='primary'
            className='addButton'
            onClick={this.props.showAll.bind(this)}
          >
            Show all items
          </Button>
          <Button
            color='primary'
            className='addButton'
            onClick={this.props.showFridge.bind(this)}
          >
            Show Fridge items
          </Button>
          <Button
            color='primary'
            className='addButton'
            onClick={this.props.showPantry.bind(this)}
          >
            Show Pantry items
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Topcontrols;
