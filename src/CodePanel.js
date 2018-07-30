import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CodePanel extends Component {
  render(){
    return (
      <pre className="Output">

        { this.props.output }

        <CopyToClipboard
          className="Copy-button"
          text={this.props.output}
          onCopy={() => this.setState({copied: true})}
        >
          <button>Copy</button>
        </CopyToClipboard>

      </pre>
    )
  }
}

export default CodePanel
