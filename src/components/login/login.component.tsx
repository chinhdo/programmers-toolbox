import React from 'react';
import { signInWithGoogle } from '../../utils/firebase.utils';
import './login.styles.scss';
import { Redirect } from 'react-router-dom';

type Props = Record<string, unknown>;

type State = {
  email: string;
  password: string;
  redirectToProfile: boolean;
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToProfile: false,
    };

    this.login = this.login.bind(this);
  }

  login(): void {
    signInWithGoogle()
      .then(() => {
        this.setState({ redirectToProfile: true });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render(): React.ReactNode {
    if (this.state.redirectToProfile) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login">
        <h1>Login</h1>
        <div className="buttons">
          <button className="btn btn-outline-primary" onClick={this.login} title="Sign in with Google">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
