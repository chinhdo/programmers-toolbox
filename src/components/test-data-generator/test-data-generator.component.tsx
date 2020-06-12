import React, { Component } from 'react';
import './test-data-generator.scss';

type Props = {

}

type State = {
}

class TestDataGenerator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }

  }

  render(): React.ReactNode {
    return (
      <div className="TestDataGenerator">
        TEST DATA GENERATOR
      </div>
    );

  }
}

export default TestDataGenerator;
