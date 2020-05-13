import React, { Component } from 'react';
import './sidebar.styles.css'

export class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Programmer's Toolbox by CD</h3>
          <strong>BS</strong>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a href="#homeSubmenu">
              <i className="fas fa-home"></i>UUID/GUID
            </a>
            <ul className="list-unstyled" id="homeSubmenu">
              <li><a href="#a">UUID/GUID</a></li>
              <li><a href="#a">Short UUID</a></li>
            </ul>
          </li>
          <li>
            <a href="#a">
              <i className="fas fa-copy"></i>Encode/Decode
            </a>
            <ul className="list-unstyled" id="pageSubmenu">
              <li><a href="#a">URL</a></li>
              <li><a href="#a">HTML</a></li>
              <li><a href="#a">JSON</a></li>
              <li><a href="#a">Base64</a></li>
            </ul>
          </li>
          <li>
            <a href="#a">
              <i className="fas fa-question"></i>FAQ</a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button>Just a Button</button>
        </div>
      </nav>
    );
  }
}