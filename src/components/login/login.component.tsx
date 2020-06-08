import React from 'react';
import { signInWithGoogle } from '../../utils/firebase.utils';

import './login.styles.scss';
import { Redirect } from 'react-router-dom';

interface IProps { }

interface IState {
  email: string,
  password: string,
  redirectToProfile: boolean
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToProfile: false
    };

    this.login = this.login.bind(this);
  }

  login() {
    signInWithGoogle().then( (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.setState({ redirectToProfile: true });
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {

    if (this.state.redirectToProfile) {
      return (<Redirect to="/"/>);
    }

    return (
      <div className='login'>
        <h1>Login</h1>
        <div className='buttons'>
          <button className="btn btn-outline-primary" onClick={this.login} title="Sign in with Google">Sign in with Google</button>
        </div>

      </div>
    );
  }
}

export default Login;