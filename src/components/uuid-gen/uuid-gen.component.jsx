import React, { Component } from 'react';
import './uuid-gen.styles.css'
import { v4 as uuidv4 } from 'uuid';

class UuidGen extends Component {
  constructor(props) {
    super(props);
    this.state = { showCopy: false }
    this.generate = this.generate.bind(this);
  }

  componentDidMount() {
  }

  generate() {
    this.setState({
      showCopy: true,
      uuid: uuidv4()
    });
  }

  render() {
    const { showCopy } = this.state;
    return (
      <div className="UuidGen">
        <div id="content">
          <h1>Generate UUIDs/GUIDs</h1>
          <button className="btn btn-primary" onClick={this.generate}>Generate</button>
          <div className="output">{this.state.uuid}
            {showCopy && (<i className="fas fa-copy"></i>)}
          </div>
        </div>
      </div>
    );

  }
}

export default UuidGen;
