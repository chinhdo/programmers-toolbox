import React, { Component, MouseEvent } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import UuidGen from './pages/uuid-gen/uuid-page.component';
import { Footer } from './components/shared/footer.component';
import HomePage from './pages/home/homepage.component';
import './App.scss';
import EncodingPage from './pages/encoding/encoding-page.component';

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
      <BrowserRouter>
        <div className="App" onMouseUp={this.onMouseUp}>
          <nav id="sidebar" className={this.getClassName()}>
            <div className="closeBtn" onClick={() => this.toggleMenu}><i className="fas fa-bars"></i></div>
            <ul className="list-unstyled components">
              <li><Link to="/"><i className="fas fa-tools fa-fw"></i>Programmers' Toolbox by CD</Link></li>
              <li><Link to="/uuid"><i className="fas fa-fingerprint fa-fw"></i>UUID/GUID</Link></li>
              <li><Link to="/encode"><i className="far fa-file-code fa-fw"></i>Encode/Decode</Link></li>
              <li><Link to="/hash"><i className="fas fa-hashtag fa-fw"></i>Hashes</Link></li>
              <li><Link to="/lorem"><i className="fas fa-file-alt fa-fw"></i>Generate Lorem Ipsum</Link></li>
              <li><Link to="/format"><i className="fas fa-pencil-alt fa-fw"></i>Format</Link></li>
              <li><Link to="/testdata"><i className="fas fa-table fa-fw"></i>Generate Test Data</Link></li>
              <li><Link to="/signup"><i className="fas fa-user-plus fa-fw"></i>Sign up</Link></li>
              <li><Link to="/login"><i className="fas fa-sign-in-alt fa-fw"></i>Login</Link></li>
              <li><Link to="/faq"><i className="fas fa-question fa-fw"></i>FAQ</Link></li>
            </ul>
          </nav>

          <div id="content">
            <header>
              <div className="three-bars" onClick={() => this.toggleMenu()}>
                <i className="fas fa-bars"></i>
                Programmers' Toolbox by CD
              </div>
            </header>
            <Switch>
              <Route path="/uuid"><UuidGen /></Route>
              <Route path="/encode"><EncodingPage /></Route>
              <Route exact path="/"><HomePage /></Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
