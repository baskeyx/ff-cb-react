import React, {Component} from 'react';

class TopSelect extends Component {
  render(){
    return (
      <select className="Top-select" onChange={this.props.change}>
      {Object.keys(this.props.templateAttributes).map(key =>
        <option key={key} value={this.props.templateAttributes[key].name}>{this.props.templateAttributes[key].desc}</option>
      )}
      </select>
    )
  }
}

export default TopSelect;
