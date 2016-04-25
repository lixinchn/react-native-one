import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import IndexBanner from './banner';
import IndexProList from './pro_list';
import { fetchProList } from '../../actions/index/pro_list';

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

  scroll: {
    marginBottom: 50,
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.isFetching = false;
    this.windowHeight = Dimensions.get('window').height;
    this.height = 0;
    this.offset = 0;
    this.lastRoundId = 0;
    this.lastWeight = 0;
  }

  onScroll(e) {
    this.height = e.nativeEvent.contentSize.height;
    this.offset = e.nativeEvent.contentOffset.y;
  }

  onResponderRelease(e) {
    if (this.height && this.windowHeight + this.offset >= this.height + 200 && !this.isFetching) {
      this.isFetching = true;
      this.props.dispatch(fetchProList(this.lastRoundId, this.lastWeight));
    }
  }

  onChooseLastRoundIdAndLastWeight(proList) {
    proList.forEach((pro) => {
      if (!this.lastRoundId || this.lastRoundId > pro.roundId) {
        this.lastRoundId = pro.roundId;
      }

      if (!this.lastWeight || this.lastWeight > pro.weight) {
        this.lastWeight = pro.weight;
      }
    })
  }

  render() {
    this.isFetching = false;
    this.onChooseLastRoundIdAndLastWeight(this.props.proList);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          automaticallyAdjustContentInsets={false}
          onScroll={this.onScroll.bind(this)}
          scrollEventThrottle={200}
          onResponderRelease={this.onResponderRelease.bind(this)}>
          <IndexBanner {...this.props} />
          <IndexProList {...this.props} />
        </ScrollView>
      </View>
    );
  }
}
