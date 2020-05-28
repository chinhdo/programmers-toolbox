import React from 'react';
import { signInWithGoogle } from '../../utils/firebase.utils';

import './login.styles.scss';

interface IProps { }

interface IState {
  email: string,
  password: string
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };    
  }

  login() {
    signInWithGoogle().then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log('Logged in', result.user)
    }).catch(function(error) {
      console.error(error);
    });
  }

  render() {
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