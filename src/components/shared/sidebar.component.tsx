import React, { Component } from 'react';
import './sidebar.styles.scss'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from '../../pages/home/homepage.component';
import UuidGen from '../uuid-gen/uuid-gen.component';
const globalAny: any = global;

interface IState {
  className: string
}

interface IProps {

}

export class SideBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      className: "off"
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    globalAny.toggleMenu = this.toggleMenu;
  }

  getClassName() {
    return this.state.className;
  }

  toggleMenu(className?: string) {

    let newState;
    if (className) {
      newState = className;
    }
    else {
      newState = this.state.className === "on" ? "off" : "on";
    }

    globalAny.menuVisible = newState === "on";
    this.setState({ className: newState });
  }

  render() {
    // TODO: Have to use () => for onCLick otherwise got error. Find out why!
    return (
      <Router>
        <nav id="sidebar" className={this.getClassName()}>
          <div className="closeBtn" onClick={() => this.toggleMenu}><i className="fas fa-bars"></i></div>
          <ul className="list-unstyled components">
            <li><Link to="/"><i className="fas fa-tools fa-fw"></i>Programmer's Toolbox by CD</Link></li>
            <li><Link to="/uuid"><i className="fas fa-fingerprint fa-fw"></i>UUID/GUID</Link></li>

            <li><a href="/"><i className="fas fa-tools fa-fw"></i>Programmer's Toolbox</a></li>
            <li className="active"><a href="/uuid"><i className="fas fa-fingerprint fa-fw"></i>UUID/GUID</a></li>
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
        {/* <Switch>
          <Route path="/uuid"><UuidGen /></Route>
          <Route exact path="/"><HomePage /></Route>
        </Switch> */}
      </Router>
    );
  }
}