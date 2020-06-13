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
        { /* TODO Move this to App so that it shows up everywhere. And use another path. This cloud is copied from NG CLI. */ }
        <svg id="clouds" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
          <path id="Path_39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" />
        </svg>
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
