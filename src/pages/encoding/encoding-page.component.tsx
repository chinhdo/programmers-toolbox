import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import HTMLDecoderEncoder from 'html-encoder-decoder';
import * as ls from 'local-storage';

// TODO: Add info about HTML and Base64 encoding to info section.
// TODO: Bug - Encode undo indent

import './encoding-page.styles.scss';

interface IProps { }

enum EncodeType {
  url = "url", html = "html", base64 = "base64"
}

interface IState {
  encodeType: EncodeType;
  input: string;
  output: string;
}

class EncodingPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      input: '',
      output: '',
      encodeType: EncodeType.url
    };  


    const prevState = ls.get('encode');
    if (prevState) {
      this.state = prevState as IState;
    }


    this.inputChanged = this.inputChanged.bind(this);
    this.outputChanged = this.outputChanged.bind(this);
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
    this.keydown = this.keydown.bind(this);
    this.radioChanged = this.radioChanged.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
  }

  // TODO: Save form state (with Redux?)
  // TODO: Remember key choices in browser storage
  // TODO: tab/shift tab to indent/unindent

  decode() {
    let decoded: string;
    switch (this.state.encodeType) {
      case EncodeType.url:
        decoded = decodeURIComponent(this.state.output);
        break;
      case EncodeType.html:
        decoded = HTMLDecoderEncoder.decode(this.state.output);
        break;
      case EncodeType.base64:
        decoded = atob(this.state.output);
        break;
      default:
        decoded = 'NA';
        break;
    }

    this.setState({ input: decoded });
  }

  encode() {
    let encoded: string;
    switch (this.state.encodeType) {
      case EncodeType.url:
        encoded = encodeURIComponent(this.state.input);
        break;
      case EncodeType.html:
        encoded = HTMLDecoderEncoder.encode(this.state.input);
        break;
      case EncodeType.base64:
        encoded = btoa(this.state.input);
        break;
      default:
        encoded = 'NA';
        break;
    }

    this.setState({ output: encoded });
  }

  // TODO: extract this code into a reusable textarea component
  keydown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'z') {
      e.preventDefault();
    }

    // Support for tab/shift tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target as HTMLTextAreaElement;
      let text = ta.value;
      const s1 = ta.selectionStart;
      const s2 = ta.selectionEnd;

      if (ta.selectionStart === ta.selectionEnd) {
        if (e.shiftKey) {
          let p1 = s1 === 0 ? 0 : Math.max(text.lastIndexOf('\n', s1 - 1) + 1, 0); // Start of current line
          let p2 = text.indexOf('\n', p1 + 1); // End of current line
          p2 = p2 === -1 ? text.length : p2;

          const line = text.substring(p1, p2);

          if (line.startsWith('  ')) {
            ta.value = text.substring(0, p1) + text.substring(p1 + 2, text.length);;
            ta.selectionStart = s1 > 1 ? s1 - 2 : 0;
            ta.selectionEnd = ta.selectionStart;
          }
        }
        else {
          ta.focus();
          document.execCommand('insertText', false, '  ');
        }
      } else { // text selected
        let p1 = s1 === 0 ? 0 : Math.max(text.lastIndexOf('\n', s1 - 1) + 1, 0); // Start of current line
        let p2 = text.indexOf('\n', s2);
        p2 = p2 === -1 ? text.length : p2;
        if (e.shiftKey) {
          let idx = p2 - 1;
          let charsRemoved = 0;
          while (idx >= p1) {
            if (text[idx] === '\n') {
              if (text.indexOf('  ', idx) === idx + 1) {
                text = [text.slice(0, idx + 1), text.slice(idx + 3)].join('');
                charsRemoved += 2;
              }
            }
            idx--;
          }
          if (text.indexOf('  ', idx) === idx + 1) {
            text = [text.slice(0, idx + 1), text.slice(idx + 3)].join('');
            charsRemoved += 2;
          }

          ta.value = text;
          ta.selectionStart = s1;
          ta.selectionEnd = s2 - charsRemoved;
        } else {
          let idx = p2 - 1;
          let charsAdded = 0;
          while (idx >= p1) {
            if (text[idx] === '\n') {
              text = [text.slice(0, idx + 1), '  ', text.slice(idx + 1)].join('');
              charsAdded += 2;
            }
            idx--;
          }
          text = [text.slice(0, idx + 1), '  ', text.slice(idx + 1)].join('');
          charsAdded += 2;

          ta.value = text;
          ta.selectionStart = s1;
          ta.selectionEnd = s2 + charsAdded;
        }
      }
    }
  }

  inputChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ input: e.target.value });
  }

  outputChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ output: e.target.value });
  }

  radioChanged(e: ChangeEvent<HTMLInputElement>) {
    const value: string = (e.target as HTMLInputElement).value;
    this.setState({ encodeType: EncodeType[value as keyof typeof EncodeType] })
  }

  timer!: NodeJS.Timeout;

  saveStateToLocalStorage() {
    if (this.timer) { clearTimeout(this.timer); }

    this.timer = setTimeout(() => {
      console.log('Saved to LS.');
      ls.set('encode', this.state);
    }, 1000);
  }

  render() {
    this.saveStateToLocalStorage();

    return (
      <div className="EncodingPage">
        <h1>Encoding/Decoding</h1>
        <div>
          <div>

            <label htmlFor="urlOption">
              <input type="radio" name="encodeType" id="urlOption" value="url"
                onChange={this.radioChanged} checked={this.state.encodeType === EncodeType.url} />URL
            </label>
            <label htmlFor="htmlOption">
              <input type="radio" name="encodeType" id="htmlOption" value="html"
                onChange={this.radioChanged} checked={this.state.encodeType === EncodeType.html} />HTML
            </label>
            <label htmlFor="base64Option">
              <input type="radio" name="encodeType" id="base64Option" value="base64"
                onChange={this.radioChanged} checked={this.state.encodeType === EncodeType.base64} />Base64
              </label>
          </div>
        </div>


        {/* INPUT */}
        <div className="input">
          <textarea spellCheck="false" value={this.state.input}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>): void => this.inputChanged(ev)}
            onKeyDown={(ev) => this.keydown(ev)}
          ></textarea>
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
