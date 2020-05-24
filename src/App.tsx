import React, { Component, MouseEvent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/shared/sidebar.component';
import UuidGen from './components/uuid-gen/uuid-gen.component';
import { Footer } from './components/shared/footer.component';
import './App.css';

const globalAny: any = global;

interface IProps extends Readonly<{ name: string }> { }

class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {
    }

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseUp(e: MouseEvent) {
    if (globalAny.menuVisible) {
      let sidebar = document.getElementById('sidebar');
      if (e.target !== sidebar) {
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
        <div id="content">
          <BrowserRouter>
            <UuidGen />
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
