import React, { Component } from 'react';
import './App.css';
import { SideBar } from './components/shared/sidebar.component';
import UuidGen from './components/uuid-gen/uuid-gen.component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
  }

  onMouseUp(e) {
    console.log(global.menuVisible);
    if (global.menuVisible) {
      let sidebar = document.getElementById('sidebar');
      if (e.target !== sidebar ) {
        console.log('You clicked outside!');
        setTimeout(() => {
          global.toggleMenu("off");
        }, 250);        
      }
    }
  }

  render() {
    return (
      <div className="App" onMouseUp={this.onMouseUp}>
        <SideBar />
        <UuidGen />
      </div>
    );
  }
}

export default App;
