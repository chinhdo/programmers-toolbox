import React, { Component } from 'react';
import './login-and-sign-up.styles.scss'
import Login from '../../components/login/login.component';

interface IProps {}

interface IState {}

class LoginAndSignUpPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div className="login-and-sign-up">
        <p>Log in to save your settings.</p>
        <Login />
      </div>
    );

  }
}

export default LoginAndSignUpPage;
