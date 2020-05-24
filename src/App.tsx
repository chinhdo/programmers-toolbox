import React, { Component, MouseEvent } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UuidGen from './components/uuid-gen/uuid-gen.component';
import { Footer } from './components/shared/footer.component';
import './App.scss';
import HomePage from './pages/home/homepage.component';

interface IProps extends Readonly<{ name: string }> { }

interface IState {
  responsiveMenuOn: boolean;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      responsiveMenuOn: false
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getClassName() {
    return this.state.responsiveMenuOn ? 'on' : 'off';
  }

  onMouseUp(e: MouseEvent) {
    if (this.state.responsiveMenuOn) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    let responsiveMenuOn = !this.state.responsiveMenuOn;
    this.setState({responsiveMenuOn: responsiveMenuOn});
  }

  render() {
    return (
      <Router>
        <div className="App" onMouseUp={this.onMouseUp}>
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

          <div id="content">
            <header>
              <div className="three-bars" onClick={() => this.toggleMenu()}><i className="fas fa-bars"></i></div>
              Programmer's Toolbox by CD
            </header>
            <Switch>
              <Route path="/uuid"><UuidGen /></Route>
              <Route exact path="/"><HomePage /></Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
