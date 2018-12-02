import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import Firebase from "../../firebase";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  dropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signuot',
      text: <span onClick={this.handleSignout}>Sign out</span>
    }
  ];

  handleSignout = () => {
    Firebase.auth().signOut()
      .then(() => console.log('signed out!'))
      .catch(err => console.log(err));
  };

  render() {
    const { user } = this.state;
    const { primaryColor } = this.props;
    return (
      <Grid style={{ background: primaryColor}}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* APP HEADER */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>

            {/* User Dropdown */}
            <Header style={{ padding: '0.25em' }} as="h4">
              <Dropdown trigger={
                <span>
                  <Image src={user.photoUrl} spaced="right" avatar/>
                  {user.displayName}
                </span>
              } options={this.dropdownOptions()} />
            </Header>
          </Grid.Row>

        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;