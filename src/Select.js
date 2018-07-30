import React, {Component} from 'react';

class Select extends Component {
  render(){
    return (
      <div>
        <select name={this.props.options.name} onChange={this.props.change} value={this.props.options.default}>
          {Object.keys(this.props.options.options).map(key =>
            <option key={key} value={this.props.options.values[key]}>{this.props.options.options[key]}</option>
          )}
        </select>
      </div>
    )
  }
}

export default Select;
