import React, { Component } from 'react';
import './sidebar.styles.css'

export class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: "off"
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    global.toggleMenu = this.toggleMenu;
  }

  getClassName() {
    return this.state.className;
  }

  toggleMenu(menuState) {
    
    let newState;
    if (menuState) {
      newState = menuState;
    }
    else {
      newState = this.state.className === "on" ? "off" : "on";
    }

    global.menuVisible = newState === "on";
    this.setState({ className: newState});
  }

  render() {
    return (
      <nav id="sidebar" className={this.getClassName()}>
        <div className="closeBtn" onClick={this.toggleMenu}><i className="fas fa-bars"></i></div>
        <ul className="list-unstyled components">
          <li className="active">
            <a href="#homeSubmenu"><i className="fas fa-fingerprint fa-fw"></i>UUID/GUID</a>
          </li>
          <li><a href="#a"><i className="far fa-file-code fa-fw"></i>Encode/Decode</a></li>
          <li><a href="#a"><i className="fas fa-hashtag fa-fw"></i>Hashes</a></li>
          <li><a href="#a"><i className="fas fa-table fa-fw"></i>Generate Test Data</a></li>
          <li><a href="#a"><i className="fas fa-file-alt fa-fw"></i>Generate Lorem Ipsum</a></li>
          <li><a href="#a"><i className="fas fa-pencil-alt fa-fw"></i>Format</a></li>
          <li><a href="#a"><i className="fas fa-user-plus fa-fw"></i>Sign up</a></li>
          <li><a href="#a"><i className="fas fa-sign-in-alt fa-fw"></i>Login</a></li>
          <li><a href="#a"><i className="fas fa-question fa-fw"></i>FAQ</a></li>
        </ul>
      </nav>
    );
  }
}