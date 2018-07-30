import React, { Component } from 'react';

class Checkbox extends Component {
  render(){
    return (
      <div>
        <input type="checkbox" name={this.props.options.name} checked={this.props.options.checked} value={this.props.options.default} onChange={ this.props.change } />
        <label htmlFor={this.props.options.name}>{this.props.options.copy}</label>
      </div>
    )
  }
}

export default Checkbox;
