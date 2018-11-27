import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Button, Header, Message, Icon, GridColumn } from "semantic-ui-react";
import Firebase from '../../firebase';
import { REGISTER } from '../../constants/routes';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  };

  isFormValid = ({ email, password }) => (email && password);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true});

      Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
  };

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>

          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Form.Input fluid name="email" icon="mail" iconPosition="left" value={email}
                  placeholder="Email address" onChange={this.handleChange} type="email"
                  className={this.handleInputError(errors, 'email')} />

              <Form.Input fluid name="password" icon="lock" iconPosition="left" value={password}
                  placeholder="Passwod" onChange={this.handleChange} type="password"
                  className={this.handleInputError(errors, 'password')} />

              <Button disabled={loading} className={loading ? 'loading' : ''} 
                  color="violet" fluid size="large">
                    Submit
                  </Button>
            </Segment>
          </Form>

          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}

          <Message>Don't have an account? <Link to={REGISTER}>Register</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;