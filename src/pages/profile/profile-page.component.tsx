import React from 'react';
import './profile-page.styles.scss';

type Props = {
  currentUser: firebase.User | null;
}

type State = {

}

class ProfilePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  render(): React.ReactNode {
    return (
      <div className="login-and-sign-up">
        <h1>Profile</h1>
        <p>You are logged in as {this.props.currentUser?.displayName} ({this.props.currentUser?.email}). That's all we know.</p>
      </div>
    );

  }
}

export default ProfilePage;