import React, { Component } from 'react';
import './login-and-sign-up.styles.scss';
import Login from '../../components/login/login.component';

type Props = Record<string, unknown>;

type State = Record<string, unknown>;

// TODO: Show login info after logged in

class LoginAndSignUpPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    return (
      <div className="login-and-sign-up">
        <p>Log in to save your settings.</p>
        <Login />
      </div>
    );
  }
}

export default LoginAndSignUpPage;
