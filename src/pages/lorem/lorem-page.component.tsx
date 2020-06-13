import React, { ChangeEvent } from 'react';
import './lorem-page.styles.scss';
import { LoremIpsum } from 'lorem-ipsum';

type Props = Record<string, unknown>;

enum GenerateType {
  paragraphs = 'paragraphs',
  words = 'words',
}

type State = {
  num: number;
  html: string;
  generateType: GenerateType;
};

class LoremPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { num: 5, html: '', generateType: GenerateType.paragraphs };

    this.generate = this.generate.bind(this);
    this.numberChanged = this.numberChanged.bind(this);
    this.radioChanged = this.radioChanged.bind(this);
  }

  componentDidMount(): void {
    this.generate();
  }

  generate(): void {
    const lorem = new LoremIpsum(
      {
        sentencesPerParagraph: {
          max: 8,
          min: 4,
        },
        wordsPerSentence: {
          max: 16,
          min: 4,
        },
      },
      'html',
    );

    switch (this.state.generateType) {
      case GenerateType.paragraphs: {
        this.setState({ html: lorem.generateParagraphs(this.state.num) });
        break;
      }
      case GenerateType.words: {
        this.setState({ html: lorem.generateWords(this.state.num) });
        break;
      }
    }
  }

  numberChanged(e: ChangeEvent<HTMLInputElement>): void {
    let newNum = parseInt(e.target.value);
    if (newNum > 250) {
      newNum = 250;
    }
    this.setState({ num: newNum });
  }

  radioChanged(e: ChangeEvent<HTMLInputElement>): void {
    const value: string = (e.target as HTMLInputElement).value;
    this.setState({ generateType: GenerateType[value as keyof typeof GenerateType] }, this.generate);
  }

  render(): React.ReactNode {
    return (
      <div className="LoremPage">
        <h1>Generate Lorem Ipsum Placeholder Text</h1>
        <div className="buttons">
          <button className="btn btn-outline-primary" onClick={this.generate} title="Generate">
            Generate
          </button>
          <input
            type="number"
            title="number of items to generate"
            value={this.state.num}
            onChange={this.numberChanged}
          ></input>
          <label htmlFor="paragraphsOption">
            <input
              type="radio"
              name="generateType"
              id="paragraphsOption"
              value="paragraphs"
              onChange={this.radioChanged}
              checked={this.state.generateType === GenerateType.paragraphs}
            />
            Paragraphs
          </label>
          <label htmlFor="wordsOption">
            <input
              type="radio"
              name="generateType"
              id="wordsOption"
              value="words"
              onChange={this.radioChanged}
              checked={this.state.generateType === GenerateType.words}
            />
            Words
          </label>
        </div>

        <div className="lorem" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>

        <h3>About Lorem Ipsum Text</h3>
        <p>
          From <a href="https://en.wikipedia.org/wiki/Lorem_ipsum">Wikipedia</a>: In publishing and graphic design,
          Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface
          without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also
          be used to temporarily replace copy in a process called greeking, which allows designers to consider form
          without the meaning of the text influencing the design.
        </p>
        <p>
          Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a first-century BCE text by the
          Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical,
          improper Latin.
        </p>
        <p>
          Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was
          popularized by advertisements for Letraset transfer sheets. Lorem ipsum was introduced to the digital world in
          the mid-1980s when Aldus employed it in graphic and word-processing templates for its desktop publishing
          program PageMaker. Other popular word processors including Pages and Microsoft Word have since adopted Lorem
          ipsum as well.
        </p>
        <p>
          This page uses the npm package <a href="https://www.npmjs.com/package/lorem-ipsum">lorem-ipsum</a> behind the
          scene.
        </p>
      </div>
    );
  }
}

export default LoremPage;
