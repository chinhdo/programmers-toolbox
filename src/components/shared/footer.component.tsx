import React, { Component } from 'react';
import './footer.styles.scss';

type State = Record<string, unknown>;

type Props = Record<string, unknown>;

export class Footer extends Component<Props, State> {
  tweet() {
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title + ' '
      + window.location.href + ' via @chinhdo #DEVCommunity');
    var win = window.open(url, '_blank');
    win?.focus();
  }

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <button className="btn-outline-primary btn-sm" onClick={this.tweet}><i className="fab fa-twitter"></i> Tweet</button>
        </div>
        <div className="Footer">
          <h3>About this app</h3>
          <p>Version: 0.62.</p>
          <p>
            By <a href="https://www.chinhdo.com">Chinh Do</a>. Contact Chinh on{' '}
            <a href="https://twitter.com/chinhdo">Twitter</a> if you find an issue or have a suggestion.
        </p>
          <p>
            <a href="https://github.com/chinhdo/programmers-toolbox">GitHub repository</a>
          </p>
        </div>
      </div>
    );
  }
}
