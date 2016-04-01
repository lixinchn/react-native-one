import React, {
  Component,
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} from 'react-native';
import Content from './content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Share extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '晒单',
          component: Content
        }} />
    );
  }
}
