import React, { Component } from 'react';

import './homepage.styles.scss';
import { Link } from 'react-router-dom';
import Logo from '../../components/shared/logo.component';

type Props = {

}

type State = {

}

class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  render(): React.ReactNode {
    return (
      <div className="HomePage">
        <h1>Programmers' Toolbox</h1>
        <h2>by <a href="https://twitter.com/chinhdo">Chinh Do</a></h2>
        <p>
          Hello fellow programmer (or non-programmer <span role="img" aria-label="smiley face">😄</span> - we all need to generate a GUID from time to time - no judging here)!
          I am hoping to make this site the best place for frequently used tools like encoding/decoding, hashing things, generating UUIDs, etc.
          This site is entirely client-side so that once the site is loaded, everything will happen on your browser and should be very fast.
        </p>
        <div className="logo"><Logo /></div>
        <p>
          This site uses browser local storage to remember settings.
        </p>
        <ul>
          <li>Generate a <Link to="/uuid">UUID or GUID</Link></li>
          <li><Link to="/encode">URL/HTML/Base64 Encode/Decode</Link></li>
          <li><Link to="/hash">MD5/SHA-256 generator</Link></li>
        </ul>
        <h2>Feature Roadmap</h2>
        <p>Features to be implemented in the next month or so.</p>
        <ul>
          <li>Persist data in browser local storage (asks for permission first)</li>
          <li>CSS color mixer</li>
          <li>Test data generator</li>
          <li>Lorem Ipsum generator</li>
          <li>Formatters (compact JSON)</li>
          <li>Break long strings into multiple lines for various languages</li>
          <li>HTML page template</li>
          <li>Light mode</li>
          <li>Logins</li>
          <ul>
            <li>Create account to save settings</li>
            <li>Social login with Google or Facebook</li>
            <li>Email login</li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default HomePage;
