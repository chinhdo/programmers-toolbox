import React, { Component } from 'react';
import './uuid-gen.styles.css'
import { v4 as uuidv4 } from 'uuid';

class UuidGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCopy: false,
      uuids: []
    }

    this.clear = this.clear.bind(this);
    this.generate = this.generate.bind(this);
    this.copyClipboard = this.copyClipboard.bind(this);
  }

  componentDidMount() {
    this.generate();
  }

  clear() {
    this.setState({uuids: []})
  }

  copyClipboard(str) {
    const el = document.getElementById('ClipboardHelper');
    el.value = str;
    el.select();
    document.execCommand('copy');
    console.log("copied " + str)
  }

  generate() {
    const uuids = this.state.uuids;
    uuids.push(uuidv4());

    this.setState({
      uuids: uuids
    });
  }

  render() {
    const uuids = [];
    for (let i = 0; i < this.state.uuids.length; i++) {
      uuids.push(<li key={i.toString()}>{this.state.uuids[i]}<i className="fas fa-copy"></i></li>);
    }

    return (
      <div className="UuidGen">
        <div id="content">
          <h1>Generate UUIDs/GUIDs</h1>
          <button className="btn btn-outline-primary" onClick={this.generate}>Generate</button>
          <button className="btn btn-outline-secondary" onClick={this.clear}>Clear</button>
          <div className="output">
            <ul><code>{uuids}</code></ul>            
            <div className="info">
              We've created a few UUIDs for you. Click Generate to create more.
            </div>            
          </div>

        </div>
        <textarea id="ClipboardHelper"></textarea>
      </div>
    );

  }
}

export default UuidGen;
