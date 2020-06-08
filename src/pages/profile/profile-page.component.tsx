import React from 'react';
import './profile-page.styles.scss';

interface IProps {
  currentUser: any
}

interface IState {}

class ProfilePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="login-and-sign-up">
        <h1>Profile</h1>
        <p>You are logged in as {this.props.currentUser?.displayName}.</p>
        
      </div>
    );

  }
}

export default ProfilePage;