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
  },

  header: {
    backgroundColor: '#FD3934',
    height: 60,
    justifyContent: 'center',
    paddingTop: 15,
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default class Content extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          <IndexSwiper {...this.props}/>
        </ScrollView>
      </View>
    );
  }
}
