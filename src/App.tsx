import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
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
                  <i className="fas fa-fingerprint fa-fw"></i>GUID Generator
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/uuid-generator`}>
                  <i className="fas fa-fingerprint fa-fw"></i>UUID Generator
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/url-encoder`}>
                  <i className="far fa-file-code fa-fw"></i>URL Encoder/Decoder
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/html-encoder`}>
                  <i className="far fa-file-code fa-fw"></i>HTML Encoder/Decoder
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/base64-encoder`}>
                  <i className="far fa-file-code fa-fw"></i>Base64 Encoder/Decoder
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/md5-hash-generator`}>
                  <i className="fas fa-hashtag fa-fw"></i>MD5 Hash Generator
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/sha-256-hash-generator`}>
                  <i className="fas fa-hashtag fa-fw"></i>SHA-256 Hash Generator
                </Link>
              </li>
              <li>
                <Link to={`${this.baseDir}/lorem-ipsum-generator`}>
                  <i className="fas fa-file-alt fa-fw"></i>Lorem Ipsum Generator
                </Link>
              </li>
            </ul>
          </nav>

          <div id="content">
            <header>
              <span className="three-bars" onClick={() => this.toggleMenu()}>
                <i className="fas fa-bars"></i>
              </span>
              <span className="title">
                Programmer&apos;s Toolbox by <a href="https://twitter.com/chinhdo">Chinh Do</a>
              </span>
            </header>
            <Switch>
              <Route path={`${this.baseDir}/guid-generator`}>
                <HomePage />
              </Route>
              <Route path={`${this.baseDir}/uuid-generator`}>
                <HomePage />
              </Route>
              <Route path={`${this.baseDir}/url-encoder`}>
                <EncodingPage />
              </Route>
              <Route path={`${this.baseDir}/html-encoder`}>
                <EncodingPage />
              </Route>
              <Route path={`${this.baseDir}/base64-encoder`}>
                <EncodingPage />
              </Route>
              <Route path={`${this.baseDir}/md5-hash-generator`}>
                <CryptoPage />
              </Route>
              <Route path={`${this.baseDir}/sha-256-hash-generator`}>
                <CryptoPage />
              </Route>
              <Route path={`${this.baseDir}/lorem-ipsum-generator`}>
                <LoremPage />
              </Route>
              <Route exact path={`${this.baseDir}`}>
                <Redirect to={`${this.baseDir}/guid-generator`} />
              </Route>
              <Route exact path="">
                <Redirect to={`${this.baseDir}/guid-generator`} />
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
