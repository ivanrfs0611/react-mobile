import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';

import {Button, CardSection, Card, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onButtonPress = () => {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  };

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed.',
      loading: false,
    });
  };

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return <Button onPress={this.onButtonPress}>Log In</Button>;
  }
  render() {
    const styles = {
      errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
      },
    };
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="example@gmail.com"
            label="email"
            onChangeText={(email) => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="password"
            onChangeText={(password) => this.setState({password})}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}
export default LoginForm;
