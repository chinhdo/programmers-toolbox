import React, { Component, MouseEvent } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import UuidGen from './pages/uuid-gen/uuid-page.component';
import { Footer } from './components/shared/footer.component';
import HomePage from './pages/home/homepage.component';
import EncodingPage from './pages/encoding/encoding-page.component';
import LoginAndSignUpPage from './pages/login-and-sign-up/login-and-sign-up.component';
import { createUserProfileDocument, auth } from './utils/firebase.utils';

import './App.scss';

// TODO: https://docs.microsoft.com/en-us/azure/static-web-apps/routes?WT.mc_id=build2020_swa-docs-jopapa

interface IProps extends Readonly<{ name: string }> { }

interface IState {
  currentUser: any; // TODO
  responsiveMenuOn: boolean;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentUser: null,
      responsiveMenuOn: false
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  unsubscribeFromAuth: any; // TODO

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);

        userRef?.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      console.log('User', userAuth); // TODO remove
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  getClassName() {
    return this.state.responsiveMenuOn ? 'on' : 'off';
  }

  logOut() {
    console.log('Logging out.');
    auth.signOut();
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
              <li><Link to="/test"><i className="fas fa-table fa-fw"></i>Test</Link></li>
              <li><Link to="/signup"><i className="fas fa-user-plus fa-fw"></i>Sign up</Link></li>
              
              {this.state.currentUser ? 
                <div>
                  <li><Link to="" onClick={() => this.logOut()}><i className="fas fa-sign-out-alt fa-fw"></i>Logout</Link></li>
                  <li><Link to="/profile"><i className="fas fa-user-circle fa-fw"></i>{this.state.currentUser.displayName}</Link></li>
                </div>
                : 
                <li><Link to="/login"><i className="fas fa-sign-in-alt fa-fw"></i>Login</Link></li>
              }
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
              <Route path="/login"><LoginAndSignUpPage /></Route>
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
