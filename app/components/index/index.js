import React, {
  Component,
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} from 'react-native';
import Content from './content';
import IndexSwiper from './swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Index extends Component {
  render() {
    return (
      <NavigatorIOS
        barTintColor='#FF4747'
        style={styles.container}
        initialRoute={{
          title: '夺宝',
          component: Content,
        }} />
    );
  }
}
