import React, {Component, ChangeEvent, KeyboardEvent} from 'react';
import './text-edit.styles.scss';

interface IProps {

}

interface IState {
  text: string,
  onChange?: ChangeEvent<HTMLTextAreaElement>
}

class TextEditBox extends Component<IProps, IState> {
  
  textArea: React.RefObject<HTMLTextAreaElement>;
  onchange: any;

  constructor(props: IProps) {
    super(props);

    this.textArea = React.createRef();
    this.onchange = this.textArea.current?.onchange;

    if (!this.state) {
      this.state = {
        text: '',
        onChange: undefined
      }
    }
  }  

  changed(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ text: e.target.value });
  }

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

  render() {
    return (
      <div className="TextEditBox">
        <textarea ref={this.textArea} spellCheck="false" value={this.state.text}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>): void => this.changed(ev)}
            onKeyDown={(ev) => this.keydown(ev)}
          ></textarea>
      </div>
    );

  }
}

export default TextEditBox;
