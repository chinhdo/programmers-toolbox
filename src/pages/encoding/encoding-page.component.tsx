import React, { Component } from 'react';

import './encoding-page.styles.scss';

interface IProps { }

interface IState { 
  input: string;
  output: string;
}

class EncodingPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {input: '', output: ''};

    this.inputChanged = this.inputChanged.bind(this);
    this.outputChanged = this.outputChanged.bind(this);
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
  }

  // TODO: Save form state (with Redux?)
  // TODO: Remember key choices in browser storage
  // TODO: tab/shift tab to indent/unindent

  decode() {
    // TODO: look at encode type
    const decoded = decodeURI(this.state.output);
    this.setState({input: decoded});
  }

  encode() {
    // TODO: look at encode type
    const encoded = encodeURI(this.state.input);
    this.setState({output: encoded});
  }

  inputChanged(event: { target: { value: any; }; }) {
    this.setState({input: event.target.value});
  }

  outputChanged(event: { target: { value: any; }; }) {
    this.setState({output: event.target.value});
  }

  render() {
    return (
      <div className="EncodingPage">
        <h1>Encoding/Decoding</h1>
        <div className="btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active"><input type="checkbox"></input>URL</label>
          <label className="btn btn-secondary"><input type="checkbox"></input>HTML</label>
          <label className="btn btn-secondary"><input type="checkbox"></input>Base64</label>
        </div>

        <div className="input">
          <textarea spellCheck="false" value={this.state.input} onChange={this.inputChanged}></textarea>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-primary" title="Encode" onClick={this.encode}>Encode <i className="fas fa-arrow-down"></i></button>
          <button className="btn btn-outline-secondary" title="Encode" onClick={this.decode}>Decode <i className="fas fa-arrow-up"></i></button>
        </div>
        <div className="output">
          <textarea spellCheck="false" value={this.state.output} onChange={this.outputChanged}></textarea>
        </div>
      </div>
    );
  }
}

export default EncodingPage;
