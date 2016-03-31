import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class IndexSwiper extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showButtons={true} height={80}>
        <View style={styles.slide}>
          <Text style={styles.text}>Hello</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  text: {
    color: '#FFF',
    fontSize: 30,
  }
})

