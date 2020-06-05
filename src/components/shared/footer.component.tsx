import React, { Component } from 'react';
import './footer.styles.scss'

interface IState {
  
}

interface IProps {

}

export class Footer extends Component<IProps, IState> {
  render() {
    return (
      <div className='Footer'>
        <h3>About this app</h3>
        <p>Version: Alpha 0.23 (2020-06-04).</p>
        <p>By <a href="https://www.chinhdo.com">Chinh Do</a>. Contact Chinh on <a href="https://twitter.com/chinhdo">Twitter</a> if you find an issue or have a suggestion.</p>
        <p><a href="https://github.com/chinhdo/programmers-toolbox">GitHub repository</a></p>
      </div>
    );
  }
}