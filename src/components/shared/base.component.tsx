import { Component } from 'react';
import * as ls from 'local-storage';

// TODO: Is this the right way to centralize saveState logic?

class BaseComponent<P, S> extends Component<P, S> {
  private name: string;

  constructor(name: string, props: P, context?: S) {
    super(props, context);

    this.name = name;

    const prevState = ls.get(`${name}-state`);
    if (prevState) {
      this.state = prevState as S;
    }
  }

  timer!: NodeJS.Timeout;

  saveStateToLocalStorage() {
    if (this.timer) { clearTimeout(this.timer); }

    this.timer = setTimeout(() => {
      ls.set(`${this.name}-state`, this.state);
    }, 1000);
  }
}

export default BaseComponent;