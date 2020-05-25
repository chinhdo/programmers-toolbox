import React, { Component, ChangeEvent, KeyboardEvent } from 'react';

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
    this.keydown = this.keydown.bind(this);
  }

  // TODO: Save form state (with Redux?)
  // TODO: Remember key choices in browser storage
  // TODO: tab/shift tab to indent/unindent

  decode() {
    // TODO: look at encode type
    const decoded = decodeURIComponent(this.state.output);
    this.setState({input: decoded});
  }

  encode() {
    // TODO: look at encode type
    const encoded = encodeURIComponent(this.state.input);
    this.setState({output: encoded});
  }

  keydown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Support for tab/shift tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();      

      const ta = e.target as HTMLTextAreaElement;
      const text = ta.value;
      const selectionStart = ta.selectionStart;
      
      if (e.shiftKey) {
        let lineStart = ta.selectionStart > 0 ? ta.selectionStart - 1: 0;
        while (lineStart>0) {
          const char = text[lineStart];
          if (char === '\n') {
            lineStart ++;
            break;
          }
          lineStart--;
        }

        let lineEnd = ta.selectionStart;
        while (lineEnd<text.length) {
          const char = text[lineEnd];
          if (char === '\n') {
            lineEnd--;
            break;
          }
          lineEnd ++;
        }

        const line = text.substring(lineStart, lineEnd);
        // console.log(`sa=${ta.selectionStart} line=[${line}].`);
        console.log(`lineStart=${lineStart} lineEnd=${lineEnd}`);

        if (line.startsWith('  ')) {
          console.log(`1=[${text.substring(0, lineStart)}]`);
          console.log(`2=[${text.substring(lineStart + 2)}]`);

          const newText = text.substring(0, lineStart) + text.substring(lineStart + 2, text.length);
          
          ta.value = newText;
  
          ta.selectionStart = selectionStart>1 ? selectionStart - 2 : 0;
          ta.selectionEnd = ta.selectionStart;  
        }
      } 
      else {
        ta.focus();
        document.execCommand('insertText', false, '  ');
      }     
    }    
  }

  inputChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({input: e.target.value});    
  }

  outputChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({output: e.target.value});
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

        {/* INPUT */}
        <div className="input">
          <textarea spellCheck="false" value={this.state.input}
          onChange={(ev: ChangeEvent<HTMLTextAreaElement>): void => this.inputChanged(ev)} 
          onKeyDown={(ev) => this.keydown(ev)}></textarea>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-primary" title="Encode" 
            onClick={this.encode}>Encode <i className="fas fa-arrow-down"></i></button>
          <button className="btn btn-outline-secondary" title="Encode"
            onClick={this.decode}>Decode <i className="fas fa-arrow-up"></i></button>
        </div>
        {/* OUTPUT */}
        <div className="output">
          <textarea spellCheck="false" value={this.state.output}
          onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => this.outputChanged(ev)}></textarea>
        </div>
        <div className="about">
          <h3>About URL Encoding</h3>
          <p>URL encoding, also known as <a href="https://tools.ietf.org/html/rfc3986#section-2.1">Percent-encoding"</a>, converts characters into
          a format that can be transmitted safely over the internet. The two most frequently used applications are encoding charaters in a URL, and data for 
          application/x-www-form-urlencoded media type, often used for submitting form data on web pages.
          </p>
          <p>Per <a href="https://tools.ietf.org/html/rfc3986">RFC 3986</a>, the list of reserved characters for Percent-encoding are: ! * ' ( ) ; : @ & = + $ , / ? # [ ].</p>
          <p>The reserved character is encoded by concatenating the % sign with the corresponding byte value of the character in hex.</p>
          <p>In JavaScript code the built-in functions encodeURIComponent and decodeURIComponent are used to perform URL encoding/decoding. In fact that's basically the code behind the URL encoding/decoding feature of this page.</p>
        </div>
      </div>
    );
  }
}

export default EncodingPage;
