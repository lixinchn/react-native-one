import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { fetchBanners } from '../../actions/index/banner.js';

export default class IndexBanner extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBanners());
  }

  render() {
    return (
      <Swiper style={styles.wrapper} showButtons={true} height={180} loop={true} autoplay={true}>
        {this.props.index.banners ? this.props.index.banners.map((banner) => 
          <View style={styles.slide} key={banner.id}>
            <Image id={banner.id} style={styles.image} source={{uri: banner.pic_url}} click_url={banner.click_url}/>
          </View>
        ) : <View style={styles.slide}>
              <Image style={styles.image} source={require('../../../res/banner_bg.png')}/>
            </View>
        }
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

