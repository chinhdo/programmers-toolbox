import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import short from 'short-uuid';
import './uuid-gen.styles.scss'

interface IProps {

}

interface IState {
  showCopy: boolean;
  uuids: string[];
}

class UuidGen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showCopy: false,
      uuids: []
    }

    this.clear = this.clear.bind(this);
    this.uuid = this.uuid.bind(this);
    this.short = this.short.bind(this);
    this.copyClipboard = this.copyClipboard.bind(this);
  }

  componentDidMount() {
    this.uuid();
    this.short();
  }

  clear() {
    this.setState({ uuids: [] })
  }

  copyClipboard(str: string) {
    const el = document.getElementById('ClipboardHelper') as HTMLInputElement;
    el.value = str;
    el.select();
    document.execCommand('copy');
  }

  short() {
    const uuids = this.state.uuids;
    const translator = short();
    uuids.push(translator.new());
    this.setState({ uuids: uuids });
  }

  uuid() {
    const uuids = this.state.uuids;
    uuids.push(uuidv4());
    this.setState({ uuids: uuids });
  }

  render() {
    const uuids = [];
    for (let i = 0; i < this.state.uuids.length; i++) {
      uuids.push(<li key={i.toString()}>{this.state.uuids[i]} <i className="fas fa-copy"></i></li>);
    }

    return (
      <div className="UuidGen">
        <h1>Generate UUID/GUID</h1>
        <button className="btn btn-outline-primary" onClick={this.uuid} title="Generate a UUID/GUID">UUID</button>
        <button className="btn btn-outline-primary" onClick={this.short} title="Generate a short UUID">Short</button>
        <button className="btn btn-outline-secondary" onClick={this.clear}>Clear</button>
        <div className="output">
          <ul><code>{uuids}</code></ul>
          <div className="info">
            <p>We've created a standard v4 UUID and a short UUID for you.</p>
            <p>
              Click on the UUID button to generate an <a href="http://www.ietf.org/rfc/rfc4122.txt">RFC4122</a> UUID.
                This generator uses the <a href="https://www.npmjs.com/package/uuid">uuid</a> npm package behind the scene. Version-4 UUIDs are generated using a random or pseudo-random number.
              </p>
            <p>Click on the Short button to generate a shorter format UUID (based on the <a href="https://www.npmjs.com/package/short-uuid">short-uuid</a> npm package.)</p>
          </div>
        </div>
        <textarea id="ClipboardHelper"></textarea>
      </div>
    );

  }
}

export default UuidGen;
