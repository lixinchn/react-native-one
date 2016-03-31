/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './app/components/main';

class OneDollar extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('OneDollar', () => OneDollar);
