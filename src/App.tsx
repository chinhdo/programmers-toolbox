import React, { Component, MouseEvent } from 'react';
import './App.css';
import { SideBar } from './components/shared/sidebar.component';
import UuidGen from './components/uuid-gen/uuid-gen.component';
const globalAny:any = global;

interface IProps extends Readonly<{name: string}> {}

class App extends Component {
  constructor(props: IProps) {
    super(props);

    this.state = {
    }

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseUp(e: MouseEvent) {
    if (globalAny.menuVisible) {
      let sidebar = document.getElementById('sidebar');
      if (e.target !== sidebar ) {
        console.log('You clicked outside!');
        setTimeout(() => {
          globalAny.toggleMenu("off");
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
