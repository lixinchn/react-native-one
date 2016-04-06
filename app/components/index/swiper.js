import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class IndexSwiper extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showButtons={true} height={150} loop={true} autoplay={true}>
        <View style={styles.slide}>
          <Image style={styles.image} source={require('../../../res/banner_bg.png')} />
        </View>
        <View style={styles.slide}>
          <Image style={styles.image} source={require('../../../res/banner_iphone6s.jpg')} />
        </View>
      </Swiper>
    );
  }
}

let width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrapper: {
  },

  slide: {
    flex: 1,
    alignItems: 'center',
  },

  image: {
    flex: 1,
    resizeMode: 'stretch',
    padding: 0,
    width: width,
  },

  text: {
    color: '#FFF',
    fontSize: 30,
  }
});

