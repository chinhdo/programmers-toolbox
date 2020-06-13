import React, { ChangeEvent, KeyboardEvent } from 'react';
import BaseComponent from '../../components/shared/base.component';
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';
import './crypto-page.styles.scss';

type Props = Record<string, unknown>;

enum HashType {
  md5 = 'md5',
  sha256 = 'sha256',
}

type State = {
  hashType: HashType;
  input: string;
  output: string;
};

class CryptoPage extends BaseComponent<Props, State> {
  constructor(props: Props) {
    super('CryptoPage', props);

    if (!this.state) {
      this.state = {
        input: '',
        output: '',
        hashType: HashType.sha256,
      };
    }

    this.inputChanged = this.inputChanged.bind(this);
    this.hash = this.hash.bind(this);
    this.keydown = this.keydown.bind(this);
    this.radioChanged = this.radioChanged.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
  }

  hash(): void {
    let hashed = '';
    switch (this.state.hashType) {
      case HashType.sha256: {
        const digest = sha256(this.state.input);
        hashed = digest.toString();
        break;
      }
      case HashType.md5:
        hashed = md5(this.state.input).toString();
        break;
      default:
        hashed = 'NA';
        break;
    }

    this.setState({ output: hashed });
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
    }
  }

  inputChanged(e: ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ input: e.target.value }, this.hash);
  }

  radioChanged(e: ChangeEvent<HTMLInputElement>): void {
    const value: string = (e.target as HTMLInputElement).value;
    this.setState({ hashType: HashType[value as keyof typeof HashType] });
  }

  render(): React.ReactNode {
    this.saveStateToLocalStorage();

    return (
      <div className="EncodingPage">
        <h1>Hashes</h1>
        <p>MD5 hash generator. SHA-256 hash generator. Generate SHA 256, MD5 hashes online.</p>
        <div>
          <label htmlFor="sha256Option">
            <input
              type="radio"
              name="hashType"
              id="sha256Option"
              value="sha256"
              onChange={this.radioChanged}
              checked={this.state.hashType === HashType.sha256}
            />
            SHA256
          </label>
          <label htmlFor="md5Option">
            <input
              type="radio"
              name="hashType"
              id="md5Option"
              value="md5"
              onChange={this.radioChanged}
              checked={this.state.hashType === HashType.md5}
            />
            md5
          </label>
        </div>

        {/* INPUT */}
        <div className="input">
          <textarea
            spellCheck="false"
            value={this.state.input}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>): void => this.inputChanged(ev)}
            onKeyDown={(ev) => this.keydown(ev)}
          ></textarea>
        </div>
        {/* Buttons */}
        <div className="buttons">
          <button className="btn btn-outline-primary" title="Hash" onClick={this.hash}>
            Hash <i className="fas fa-arrow-down"></i>
          </button>
        </div>
        {/* OUTPUT */}
        <div className="output">
          <textarea spellCheck="false" value={this.state.output} readOnly></textarea>
        </div>
        <div className="about">
          <h3>About SHA-256 Hashes</h3>
          <p>
            SHA-256 is one of the strongest hashing algorithms available. It encodes texts of any length into a string
            of 256 bits.
          </p>
          <h3>About MD5 Hashes</h3>
          <p>
            The MD5 hash algorithm takes a string of any length and encode it into a 128-bit fingerprint. It&apos;s
            widely used but has been found to suffer from vulnerabilities.
          </p>
        </div>
      </div>
    );
  }
}

export default CryptoPage;
