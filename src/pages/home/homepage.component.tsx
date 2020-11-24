import React, { Component } from 'react';
import './homepage.styles.scss';
import { Link } from 'react-router-dom';
import Logo from '../../components/shared/logo.component';
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
        <h1>GUID Generator, URL/HTML Encoders & Other Programmer&apos;s Tools</h1>

        <div className="UuidGen">
          <button className="btn btn-outline-primary btn-sm" onClick={this.uuid} title="Generate a UUID/GUID">
            GUID
          </button>
          <button className="btn btn-outline-primary btn-sm" onClick={this.short} title="Generate a short UUID">
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
              <p>We&apos;ve created a standard v4 GUID/UUID and a short GUID/UUID for you.</p>
              <p>
                Click on the GUID button to generate a <a href="http://www.ietf.org/rfc/rfc4122.txt">RFC4122</a>{' '}
                GUID/UUID. This generator uses the <a href="https://www.npmjs.com/package/uuid">uuid</a> npm package
                behind the scene. Version-4 UUIDs are generated using a random or pseudo-random number.
              </p>
              <p>
                Click on the Short button to generate a shorter format UUID (based on the{' '}
                <a href="https://www.npmjs.com/package/short-uuid">short-uuid</a> npm package.)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
