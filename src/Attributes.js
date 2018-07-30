import React, {Component} from 'react';
import Fieldset from './Fieldset';

class Attributes extends Component {
  componentDidMount = () => {
    //let attributes = this.props.templateAttributes;
    //console.log(this.props.selectedTemplate);
  }

  render(){
    return (
      <form className="Form-wrapper">
        <h3>Attributes</h3>
        { Object.keys(this.props.fieldsets).map(key =>
          <Fieldset
            key={key}
            fieldsets={this.props.fieldsets[key]}
            change={this.props.change}
          />
        )}
      </form>
    )
  }
}

export default Attributes;
