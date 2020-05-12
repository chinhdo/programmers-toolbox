import React, { Component } from 'react';
import ShortUniqueId from 'short-unique-id';
import './App.css';
import { Head } from './components/shared/head.component';
import { Footer } from './components/shared/footer.component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const uid = new ShortUniqueId();
    this.setState({
       shortUuid: uid.randomUUID(6),
       uuid: uid.randomUUID()
       });
  }

  render() {
    return (
      <div className="App">
        <Head />
        <div className="container">
          <div className="row">
            <div>
              <h2>Coming soon</h2>
              <ul>
                <li>UUID/GUID generator (example: {this.state.uuid})</li>
                <li>Short GUID/GUID generator (like this: {this.state.shortUuid})</li>
                <li>URL Encoder/Decoder</li>
                <li>Base64 Encoder/Decoder</li>
              </ul>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );

  }
}

export default App;
