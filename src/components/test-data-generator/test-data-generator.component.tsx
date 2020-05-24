import React, { Component } from 'react';
import './test-data-generator.scss';

interface IProps {

}

interface IState {
}

class TestDataGenerator extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div className="TestDataGenerator">
        TEST DATA GENERATOR
      </div>
    );

  }
}

export default TestDataGenerator;
