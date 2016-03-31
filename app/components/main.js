import React, {
  Component,
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} from 'react-native';
import Index from './index/index.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  }
});

export default class Main extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '一元夺宝',
          component: Index
        }} />
      
    );
  }
}
