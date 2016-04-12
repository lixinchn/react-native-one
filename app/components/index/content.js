import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import IndexSwiper from './swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class Content extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <IndexSwiper {...this.props}/>
      </ScrollView>
    );
  }
}
