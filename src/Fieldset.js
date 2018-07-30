import React, { Component } from 'react';
import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';

class Fieldset extends Component {
  render() {
    return (
      <fieldset>
        <legend>{this.props.fieldsets[0].name}</legend>
        { Object.keys(this.props.fieldsets).map(key =>
          <div className="Form-element" key={key}>
            {
              (this.props.fieldsets[key].tag === "input") ?
              <Input
                key={key}
                fieldsets={this.props.fieldsets[key]}
                change={this.props.change}
              />
              : null
            }
            {
              (this.props.fieldsets[key].tag === "select") ?
              <Select
                key={key}
                options={this.props.fieldsets[key]}
                change={this.props.change}
              />
              : null
            }
            {
              (this.props.fieldsets[key].tag === "checkbox" ?
              <Checkbox
                key={key}
                options={this.props.fieldsets[key]}
                change={this.props.change}
              />
              : null )
            }
          </div>
        )}
      </fieldset>
    )
  }
}

export default Fieldset;
