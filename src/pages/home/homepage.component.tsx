import React, { Component } from 'react';

import './homepage.styles.scss';
import { Link } from 'react-router-dom';
import Logo from '../../components/shared/logo.component';

type Props = Record<string, unknown>;
type State = Record<string, unknown>;

class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    return (
      <div className="HomePage">
        <h1>Programmers&apos; Toolbox</h1>
        <h2>
          by <a href="https://twitter.com/chinhdo">Chinh Do</a>
        </h2>
        <p>
          Hello fellow programmer (or non-programmer{' '}
          <span role="img" aria-label="smiley face">
            😄
          </span>{' '}
          - we all need to generate a GUID from time to time - no judging here)! I am hoping to make this site the best
          place for frequently used tools like encoding/decoding, hashing things, generating UUIDs, etc. This site is
          entirely client-side so that once the site is loaded, everything will happen on your browser and should be
          very fast.
        </p>
        <div className="logo">
          <Logo />
        </div>
        <p>This site uses browser local storage to remember settings.</p>
        <ul>
          <li>
            Generate a <Link to="/uuid">UUID or GUID</Link>
          </li>
          <li>
            <Link to="/encode">URL/HTML/Base64 Encode/Decode</Link>
          </li>
          <li>
            <Link to="/hash">MD5/SHA-256 generator</Link>
          </li>
          <li>
            <Link to="/lorem-ipsum">Lorem Ipsum generator</Link>
          </li>
          <li>
            <Link to="/css-color-mixer">HTML/CSS Color Mixer</Link>
          </li>
        </ul>
        <h2>Feature Roadmap</h2>
        <p>Potential features to be implemented in the next month or so.</p>
        <ul>
          <li>CSS color mixer</li>
          <li>Formatters (compact JSON)</li>
          <li>HTML page template?</li>
          <li>Light mode</li>
          <li>
            Anything other tools you would like to suggest? Just <a href="https://twitter.com/chinhdo">let me know</a>.
          </li>
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
