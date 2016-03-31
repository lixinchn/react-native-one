import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import IndexSwiper from './swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>123</Text>
      </View>
    );
  }
}
