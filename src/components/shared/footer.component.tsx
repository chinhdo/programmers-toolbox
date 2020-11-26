import React, { Component } from 'react';
import './footer.styles.scss';

type State = Record<string, unknown>;

type Props = Record<string, unknown>;

export class Footer extends Component<Props, State> {
  render(): React.ReactNode {
    return (
      <div className="Footer">
        <h3>About this app</h3>
        <p>Version: 0.54.</p>
        <p>
          By <a href="https://www.chinhdo.com">Chinh Do</a>. Contact Chinh on{' '}
          <a href="https://twitter.com/chinhdo">Twitter</a> if you find an issue or have a suggestion.
        </p>
        <p>
          <a href="https://github.com/chinhdo/programmers-toolbox">GitHub repository</a>
        </p>
      </div>
    );
  }
}
