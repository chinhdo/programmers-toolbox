import React, { Component } from 'react';
import './footer.styles.css'

interface IState {
  
}

interface IProps {

}

export class Footer extends Component<IProps, IState> {
  render() {
    return (
      <div className='Footer'>
        <h3>About this app</h3>
        <p>Version: Alpha 0.12 (2020-05-16).</p>
        <p>By <a href="https://www.chinhdo.com">Chinh Do</a>. Contact Chinh on <a href="https://twitter.com/chinhdo">Twitter</a> if you find an issue or have a suggestion.</p>
        <p><a href="https://github.com/chinhdo/programmers-toolbox">GitHub repository</a></p>
        <b>Feature Roadmap</b>
        <ul>
          <li>Encode/Decode (HTML, Base64, URL, Hex, )</li>
          <li>Hashes (MD5, SHA-1, SHA-2)</li>
          <li>UUID generators (GUID/UUID, short UUID)</li>
          <li>Test data generator</li>
          <li>Lorem Ipsum generator</li>
          <li>Formatters (JSON)</li>
          <li>Break strings into multiple lines for various languages</li>
          <li>Logins</li>
          <ul>
            <li>Create account to save settings</li>
            <li>Forgot password</li>
            <li>Verify email</li>
            <li>Social login with Google or Facebook</li>
            <li>Email login</li>
          </ul>
        </ul>
      </div>
    );
  }
}