import React, { Component } from 'react';
import './App.css';
import { SideBar } from './components/shared/sidebar.component';
import { HtmlEncoder } from './components/html-encoder/html-encoder.component';
import { Footer } from './components/shared/footer.component';
import UuidGen from './components/uuid-gen/uuid-gen.component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <SideBar />
        <UuidGen />
        {/* <HtmlEncoder /> */}
        {/* <Footer/> */}
      </div>
    );

  }
}

export default App;
