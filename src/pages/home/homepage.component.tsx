import React, { Component } from 'react';

import './homepage.styles.scss';

interface IProps { }

interface IState { }

class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }

  }

  render() {
    // TODO #1 Add links to tools from home page - test one two three.
    return (
      <div className="HomePage">
        <h1>Programmers' Toolbox by Chinh Do</h1>
        <p>
          Hello fellow programmer (or non-programmer <span role="img" aria-label="smiley face">😄</span> - we all need to generate a GUID from time to time - no judging here)!
          I am hoping to make this site the best place for frequently used tools like encoding/decoding, hashing things, generating UUIDs, etc.
          This site is entirely client-side so that once the site is loaded, everything will happen on your browser and should be very fast.
        </p>
      </div>
    );
  }
}

export default HomePage;
