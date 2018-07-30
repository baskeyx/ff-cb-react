import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CodePanel from './CodePanel';
import TopSelect from './TopSelect';
import Attributes from './Attributes';

class App extends Component {
  state = {
    template: "", // template content
    templateOriginal: "",
    templateAttributes: {}, // attributes for all forms
    selectedTemplate: "", // current template
    selectedFieldsets: {}
  }

  error = () => {
    alert("error loading file");
  }

  getFile = (url, onSuccess, onError) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.addEventListener('load', function (event) {
        var xhr = event.target;
        if (xhr.status >= 200 && xhr.status < 400) {
            onSuccess(xhr.responseText);
        } else {
            if (onError) {
                onError(event);
            }
        }
    });

    request.addEventListener('error',function (event) {
        if (onError) {
            onError(event);
        }
    });

    request.send();
  }

  changeTemplate = (e) => {
    let selectedTemplate = e.target.value;
    let template = `modules/${selectedTemplate}.html`;
    this.setState({selectedTemplate});

    this.getFile(template, this.successLoadTemplate, this.error);
  }

  editOutput = (template, attribute) => {

    if (attribute.tag === "checkbox" && attribute.checked === false){
      template = template.split(` @@${attribute.name}`).join(``);
    }
    else {
      template = template.split(`@@${attribute.name}`).join(`${attribute.default}`);
    }

    return template;

  }

  updateField = (e) => {
    const selectedTemplate = this.state.selectedTemplate;
    let templateOriginal = this.state.templateOriginal;
    let template = this.state.templateOriginal;

    let templateAttributes = this.state.templateAttributes;

    let selectedFieldsets = templateAttributes.find( module => module.name === selectedTemplate ).fieldsets;


    for (let i=0;i<selectedFieldsets.length;i++){
      for (let j=0;j<selectedFieldsets[i].length;j++){

        if (selectedFieldsets[i][j].name === e.target.name){

          if (e.target.type === "checkbox" && e.target.checked === false){
            selectedFieldsets[i][j].checked = false;
          }
          else if (e.target.type === "checkbox" && e.target.checked === true){
            selectedFieldsets[i][j].checked = true;
          }
          else{
            selectedFieldsets[i][j].default = e.target.value;
          }
        }
      }
    }

    for (let i=0;i<selectedFieldsets.length;i++){

      for (let j=0;j<selectedFieldsets[i].length;j++){
        template = this.editOutput(template, selectedFieldsets[i][j])
      }
    }

    this.setState({
      template,
      templateOriginal,
      selectedFieldsets
    })
  }

  successLoadTemplate = (template) => {

    let selectedTemplate = this.state.selectedTemplate;
    let templateAttributes = this.state.templateAttributes;
    let templateOriginal = template;

    let selectedFieldsets = templateAttributes.find( module => module.name === selectedTemplate ).fieldsets;

    for (let i=0;i<selectedFieldsets.length;i++){

      for (let j=0;j<selectedFieldsets[i].length;j++){
        template = this.editOutput(template, selectedFieldsets[i][j])
      }
    }

    this.setState({
      template,
      templateOriginal,
      selectedFieldsets
    })
  }

  successModulesLoad = (response) => {
    let templateAttributes = JSON.parse(response);
    let selectedTemplate = templateAttributes[0].name;

    let template = `modules/${selectedTemplate}.html`;
    this.setState({
      templateAttributes,
      selectedTemplate
    });

    this.getFile(template, this.successLoadTemplate, this.error);

  }

  componentDidMount = () => {
    const componentForm = `modules.json`;
    this.getFile(componentForm, this.successModulesLoad, this.error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Content Builder</h1>
        </header>
        <div className="Content-wrapper">
          <TopSelect
            templateAttributes={this.state.templateAttributes}
            change={this.changeTemplate}
          />
          <CodePanel
            onclick={this.editOutput}
            output={this.state.template}
          />
          <Attributes
            fieldsets={this.state.selectedFieldsets}
            change={this.updateField}
          />
        </div>
      </div>
    );
  }
}

export default App;
