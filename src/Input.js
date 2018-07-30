import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
        <input
          key={this.props.number}
          type={this.props.fieldsets.type}
          name={this.props.fieldsets.name}
          placeholder={this.props.fieldsets.name}
          onChange={this.props.change}
          value={this.props.fieldsets.default}
        />
    )
  }
}

export default Input;
