import React, { Component } from 'react';

import './homepage.styles.scss';

interface IProps {}

interface IState {}

class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div className="HomePage">
        <h1>HELLO</h1>
      </div>
    );

  }
}

export default HomePage;
