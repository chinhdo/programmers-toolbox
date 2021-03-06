import React, { ChangeEvent, KeyboardEvent } from 'react';
import BaseComponent from '../../components/shared/base.component';
import HTMLDecoderEncoder from 'html-encoder-decoder';
import './encoding-page.styles.scss';

type Props = Record<string, unknown>;

enum EncodeType {
  url = 'url',
  html = 'html',
  base64 = 'base64',
}

type State = {
  input: string;
  output: string;
};

class EncodingPage extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super('EncodingPage', props);

    if (!this.state) {
      this.state = {
        input: '',
        output: '',
      };
    }

    this.inputChanged = this.inputChanged.bind(this);
    this.outputChanged = this.outputChanged.bind(this);
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
    this.keydown = this.keydown.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
  }

  decode(type: EncodeType): void {
    let decoded: string;
    switch (type) {
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

  encode(type: EncodeType): void {
    let encoded: string;
    switch (type) {
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
  keydown(e: KeyboardEvent<HTMLTextAreaElement>): void {
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
          const p1 = s1 === 0 ? 0 : Math.max(text.lastIndexOf('\n', s1 - 1) + 1, 0); // Start of current line
          let p2 = text.indexOf('\n', p1 + 1); // End of current line
          p2 = p2 === -1 ? text.length : p2;

          const line = text.substring(p1, p2);

          if (line.startsWith('  ')) {
            ta.value = text.substring(0, p1) + text.substring(p1 + 2, text.length);
            ta.selectionStart = s1 > 1 ? s1 - 2 : 0;
            ta.selectionEnd = ta.selectionStart;
          }
        } else {
          ta.focus();
          document.execCommand('insertText', false, '  ');
        }
      } else {
        // text selected
        const p1 = s1 === 0 ? 0 : Math.max(text.lastIndexOf('\n', s1 - 1) + 1, 0); // Start of current line
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

      this.setState({ input: ta.value });
    }
  }

  inputChanged(e: ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ input: e.target.value });
  }

  outputChanged(e: ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ output: e.target.value });
  }

  render(): React.ReactNode {
    this.saveStateToLocalStorage();

    const pathName = window.location.pathname;
    const name = pathName.includes('url') ? 'URL' : pathName.includes('base64') ? 'Base64' : 'HTML';
    document.title = name + ' Encoder/Decoder';
    const type = name === 'URL' ? EncodeType.url : name === 'Base64' ? EncodeType.base64 : EncodeType.html;

    return (
      <div className="EncodingPage">
        <h1>{name} Encoder & Decoder</h1>
        <p>Input text and click encode or decode.</p>
        {/* INPUT */}
        <div className="input">
          <textarea
            spellCheck="false"
            value={this.state.input}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>): void => this.inputChanged(ev)}
            onKeyDown={(ev) => this.keydown(ev)}
          ></textarea>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-primary btn-sm" title="Encode" onClick={() => this.encode(type)}>
            Encode <i className="fas fa-arrow-down"></i>
          </button>
          <button className="btn btn-outline-secondary btn-sm" title="Encode" onClick={() => this.decode(type)}>
            Decode <i className="fas fa-arrow-up"></i>
          </button>
        </div>
        {/* OUTPUT */}
        <div className="output">
          <textarea
            spellCheck="false"
            value={this.state.output}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => this.outputChanged(ev)}
          ></textarea>
        </div>
        <div className="about">
          {name === 'URL' && (
            <div>
              <h3>About URL Encoding</h3>
              <p>
                URL encoding, also known as{' '}
                <a href="https://tools.ietf.org/html/rfc3986#section-2.1">Percent-encoding</a>, converts characters into
                a format that can be transmitted safely over the internet. The two most frequently used applications are
                encoding charaters in a URL, and data for application/x-www-form-urlencoded media type, often used for
                submitting form data on web pages.
              </p>
              <p>
                Per <a href="https://tools.ietf.org/html/rfc3986">RFC 3986</a>, the list of reserved characters for
                Percent-encoding are: ! * &apos; ( ) ; : @ & = + $ , / ? # [ ].
              </p>
              <p>
                The reserved character is encoded by concatenating the % sign with the corresponding byte value of the
                character in hex.
              </p>
              <p>
                In JavaScript code the built-in functions encodeURIComponent and decodeURIComponent are used to perform
                URL encoding/decoding. In fact that&apos;s basically the code behind the URL encoding/decoding feature
                of this page.
              </p>
            </div>
          )}

          {name === 'HTML' && (
            <div>
              <h3>About HTML Entity Encoding</h3>
              <p>
                HTML Entity Encoding encodes reserved HTML characters so that the data can be safely embedded in HTML. A
                character Entity looks like this: [&entity_name;] OR [&#entity_number;]. For example, to include the
                &lt; sign in HTML we must write &amp;lt; or &amp;#60;
              </p>
            </div>
          )}

          {name === 'Base64' && (
            <div>
              <h3>About Base64 Encoding</h3>
              <p>
                Base64 encoding represents binary data in ASCII string format by translating it into a radix-64
                reprensentation. Base64 is designed to cary data safely in channels that only reliably support text
                content.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EncodingPage;
