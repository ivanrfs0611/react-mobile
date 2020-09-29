import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
import {Header, Button, Spinner} from './src/components/common';

class App extends Component {
  state = {loggedIn: null};
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCp5H5b7aPgkg3geWVXAQGgxLWxP8Ccydg',
      authDomain: 'latauth-1f1b6.firebaseapp.com',
      databaseURL: 'https://latauth-1f1b6.firebaseio.com',
      projectId: 'latauth-1f1b6',
      storageBucket: 'latauth-1f1b6.appspot.com',
      messagingSenderId: '372383886227',
      appId: '1:372383886227:web:0d7d3400c2de28003dd666',
      measurementId: 'G-5ZEXGP9518',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}
export default App;
