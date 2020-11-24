import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import UuidPage from './pages/uuid-gen/uuid-page.component';
import { Footer } from './components/shared/footer.component';
import HomePage from './pages/home/homepage.component';
import EncodingPage from './pages/encoding/encoding-page.component';
import CryptoPage from './pages/crypto/crypto-page.component';
import './App.scss';
import Logo from './components/shared/logo.component';
import LoremPage from './pages/lorem/lorem-page.component';

type Props = Record<string, unknown>;

type State = {
  responsiveMenuOn: boolean;
};

class App extends Component<Props, State> {
  private baseDir = '/tools';

  constructor(props: Props) {
    super(props);

    this.state = {
      responsiveMenuOn: false,
    };

    this.onMouseUp = this.onMouseUp.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getClassName(): string {
    return this.state.responsiveMenuOn ? 'on' : 'off';
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
            <div className="closeBtn" onClick={() => this.toggleMenu}>
              <i className="fas fa-bars"></i>
            </div>
            <div className="logo">
              <Link className="logo" to={`${this.baseDir}`}>
                <Logo />
              </Link>
            </div>
            <ul className="list-unstyled components">
              <li>
                <Link to={`${this.baseDir}/guid-generator`}>
                  <i className="fas fa-fingerprint fa-fw"></i>UUID/GUID
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/url-encoder`}>
                  <i className="far fa-file-code fa-fw"></i>Encode/Decode
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/md5-hash-generator`}>
                  <i className="fas fa-hashtag fa-fw"></i>Hashes
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/lorem-ipsum-generator`}>
                  <i className="fas fa-file-alt fa-fw"></i>Lorem Ipsum
                </Link>
              </li>
            </ul>
          </nav>

          <div id="content">
            <header>
              <div className="three-bars" onClick={() => this.toggleMenu()}>
                <i className="fas fa-bars"></i>
                Programmers&apos; Toolbox by CD
              </div>
            </header>
            <Switch>
              <Route path={`${this.baseDir}/guid-generator`}>
                <UuidPage />
              </Route>
              <Route path={`${this.baseDir}/url-encoder`}>
                <EncodingPage />
              </Route>
              <Route path={`${this.baseDir}/md5-hash-generator`}>
                <CryptoPage />
              </Route>
              <Route path={`${this.baseDir}/lorem-ipsum-generator`}>
                <LoremPage />
              </Route>
              <Route exact path={`${this.baseDir}`}>
                <HomePage />
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
