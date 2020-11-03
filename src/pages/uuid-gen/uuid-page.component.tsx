import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import short from 'short-uuid';
import './uuid-page.styles.scss';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = Record<string, unknown>;

type State = {
  showCopy: boolean;
  uuids: string[];
  copyIdx: number;
};

/** Page to generate UUID's/GUID's and short UUIDs */
class UuidPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (!this.state) {
      this.state = {
        showCopy: false,
        uuids: [],
        copyIdx: -1,
      };
    }

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
      <div className="UuidGen">
        <h1>Online GUID Generator - Online UUID Generator / Short UUID Generator</h1>
        <button className="btn btn-outline-primary" onClick={this.uuid} title="Generate a UUID/GUID">
          UUID
        </button>
        <button className="btn btn-outline-primary" onClick={this.short} title="Generate a short UUID">
          Short
        </button>
        <button className="btn btn-outline-secondary" onClick={this.clear}>
          Clear
        </button>
        <div className="output">
          <ul>
            <code>{uuids}</code>
          </ul>
          <div className="info">
            <p>We&apos;ve created a standard v4 UUID and a short UUID for you.</p>
            <p>
              Click on the UUID button to generate an <a href="http://www.ietf.org/rfc/rfc4122.txt">RFC4122</a> UUID.
              This generator uses the <a href="https://www.npmjs.com/package/uuid">uuid</a> npm package behind the
              scene. Version-4 UUIDs are generated using a random or pseudo-random number.
            </p>
            <p>
              Click on the Short button to generate a shorter format UUID (based on the
              <a href="https://www.npmjs.com/package/short-uuid">short-uuid</a> npm package.)
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UuidPage;
