import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import UuidGen from './pages/uuid-gen/uuid-page.component';
import { Footer } from './components/shared/footer.component';
import HomePage from './pages/home/homepage.component';
import EncodingPage from './pages/encoding/encoding-page.component';
import LoginAndSignUpPage from './pages/login-and-sign-up/login-and-sign-up.component';
import { createUserProfileDocument, auth } from './utils/firebase.utils';
import CryptoPage from './pages/crypto/crypto-page.component';
import ProfilePage from './pages/profile/profile-page.component';
import './App.scss';
import Logo from './components/shared/logo.component';

type Props = {

}

type State = {
  currentUser: firebase.User | null;
  responsiveMenuOn: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentUser: null,
      responsiveMenuOn: false
    }

    this.onMouseUp = this.onMouseUp.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  unsubscribeFromAuth: firebase.Unsubscribe | undefined;

  componentDidMount():void {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);

        // TODO: Fix this
        userRef?.onSnapshot(snapShot => {
          console.log('TODO', snapShot);
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // });
        });
      }

      console.log('User', userAuth); // TODO remove
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount(): void {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  getClassName(): string {
    return this.state.responsiveMenuOn ? 'on' : 'off';
  }

  logOut(): void {
    console.log('Logging out.');
    auth.signOut();
  }

  onMouseUp(): void {
    if (this.state.responsiveMenuOn) {
      this.toggleMenu();
    }
  }

  toggleMenu(): void {
    const responsiveMenuOn = !this.state.responsiveMenuOn;
    this.setState({ responsiveMenuOn: responsiveMenuOn });
  }

  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <div className="App" onMouseUp={this.onMouseUp}>
          <nav id="sidebar" className={this.getClassName()}>
            <div className="closeBtn" onClick={() => this.toggleMenu}><i className="fas fa-bars"></i></div>
            <div className="logo">              
              <Link className="logo" to="/">
                <Logo />
              </Link>
            </div>
            <ul className="list-unstyled components">
              <li><Link to="/uuid"><i className="fas fa-fingerprint fa-fw"></i>UUID/GUID</Link></li>
              <li><Link to="/encode"><i className="far fa-file-code fa-fw"></i>Encode/Decode</Link></li>
              <li><Link to="/hash"><i className="fas fa-hashtag fa-fw"></i>Hashes</Link></li>
              <li><Link to="/lorem"><i className="fas fa-file-alt fa-fw"></i>Lorem Ipsum</Link></li>
              <li><Link to="/format"><i className="fas fa-pencil-alt fa-fw"></i>Format</Link></li>
              <li><Link to="/testdata"><i className="fas fa-table fa-fw"></i>Test Data</Link></li>

              {this.state.currentUser ?
                <div>
                  <li><Link to="" onClick={() => this.logOut()}><i className="fas fa-sign-out-alt fa-fw"></i>Logout</Link></li>
                  <li><Link to="/profile"><i className="fas fa-user-circle fa-fw"></i>{this.state.currentUser.displayName}</Link></li>
                </div>
                :
                <div>
                  <li><Link to="/login"><i className="fas fa-sign-in-alt fa-fw"></i>Login</Link></li>
                </div>
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
              <Route path="/hash"><CryptoPage /></Route>
              <Route path="/login"><LoginAndSignUpPage /></Route>
              <Route path="/profile"><ProfilePage currentUser={this.state.currentUser} /></Route>
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
