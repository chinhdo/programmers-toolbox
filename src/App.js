import React, { Component } from 'react';
import './App.css';
import { SideBar } from './components/shared/sidebar.component';
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
      </div>
    );

  }
}

export default App;
