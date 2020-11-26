import React, { Component } from 'react';
import './homepage.styles.scss';
import { v4 as uuidv4 } from 'uuid';
import short from 'short-uuid';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = Record<string, unknown>;
type State = {
  showCopy: boolean;
  uuids: string[];
  copyIdx: number;
};

class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCopy: false,
      uuids: [],
      copyIdx: -1,
    };

    this.clear = this.clear.bind(this);
    this.uuid = this.uuid.bind(this);
    this.short = this.short.bind(this);
  }

  componentDidMount(): void {
    this.uuid();
    this.short();
  }

  copy(idx: number): void {
    this.setState({ copyIdx: idx });
  }

  clear(): void {
    this.setState({ uuids: [] });
  }

  short(): void {
    const uuids = this.state.uuids;
    const translator = short();
    uuids.push(translator.new());
    this.setState({ uuids: uuids });
  }

  uuid(): void {
    const uuids = this.state.uuids;
    uuids.push(uuidv4());
    this.setState({ uuids: uuids });
  }

  render(): React.ReactNode {
    const name = window.location.pathname.endsWith('uuid-generator') ? 'UUID' : 'GUID';
    document.title = name + ' Generator';

    const uuids = [];
    for (let i = 0; i < this.state.uuids.length; i++) {
      uuids.push(
        <CopyToClipboard key={i.toString()} text={this.state.uuids[i]} onCopy={() => this.copy(i)}>
          <li key={i.toString()}>
            {' '}
            {this.state.uuids[i]} <i className="fas fa-copy"></i>
            <span className={i === this.state.copyIdx ? 'm-fadeOut' : 'm-fadeIn'}>
              {i === this.state.copyIdx ? 'Copied' : ''}
            </span>
          </li>
        </CopyToClipboard>,
      );
    }

    return (
      <div className="HomePage">
        <h1>{name} Generator</h1>

        <div className="UuidGen">
          <p>
            Generate <a href="http://www.ietf.org/rfc/rfc4122.txt">RFC4122</a> compliance {name}&apos;s and
            short/compact {name}
            &apos;s online.
          </p>
          <button className="btn btn-outline-primary btn-sm" onClick={this.uuid} title="Generate a {name}">
            {name}
          </button>
          <button className="btn btn-outline-primary btn-sm" onClick={this.short} title="Generate a short {name}">
            Short
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={this.clear}>
            Clear
          </button>
          <div className="output">
            <ul>
              <code>{uuids}</code>
            </ul>
            <div className="info">
              <p>
                This page generates <a href="http://www.ietf.org/rfc/rfc4122.txt">RFC4122</a> {name}&apos;s. The{' '}
                <a href="https://www.npmjs.com/package/uuid">uuid</a> npm package is used behind the scene. Version-4{' '}
                {name}&apos;s are generated using a random or pseudo-random number. GUID&apos;s and UUID&apos;s are the
                same things.
              </p>
              <p>
                The &quot;Short&quot; button generates a shorter/compact format {name} (based on the{' '}
                <a href="https://www.npmjs.com/package/short-uuid">short-uuid</a> npm package.)
              </p>
              <h2>Frequently Asked Questions about {name}&apos;s</h2>
              <h3>How to generate {name}&apos;s in JavaScript</h3>
              <p>
                JavaScript doesn&apos;t have a built in {name} generator. Use the{' '}
                <a href="https://www.npmjs.com/package/uuid">UUID npm package:</a>
              </p>
              <pre>{`import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '909f6853-d097-47f1-9e99-d557ced603e4'`}</pre>
              <h3>How to generate {name}&apos;s in Java</h3>
              <pre>UUID uuid = UUID.randomUUID();</pre>
              <h3>How to generate {name}&apos;s in SQL</h3>
              <pre>SELECT NEWID() AS GUID;</pre>
              <h3>How to generate {name}&apos;s in C#</h3>
              <pre>Guid id = Guid.NewGuid();</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
