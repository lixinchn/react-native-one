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

export default class Index extends Component {
  render() {
    return (
      <View><Text>我的</Text></View>
    );
  }
}
