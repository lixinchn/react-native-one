import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import IndexBanner from './banner';
import IndexProList from './pro_list';
import ScrollViewEx from '../../lib/ScrollViewEx'
import { fetchProListIfNeeded } from '../../actions/index/pro_list';

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
    this.lastRoundId = 0;
    this.lastWeight = 0;
  }

  onLoadMore() {
    this.props.dispatch(fetchProListIfNeeded(this.lastRoundId, this.lastWeight));
  }

  onChooseLastRoundIdAndLastWeight(proList) {
    proList.forEach((pro) => {
      if (!this.lastRoundId || this.lastRoundId > pro.roundId) {
        this.lastRoundId = pro.roundId;
      }

      if (!this.lastWeight || this.lastWeight > pro.weight) {
        this.lastWeight = pro.weight;
      }
    });
  }

  render() {
    this.onChooseLastRoundIdAndLastWeight(this.props.proList);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <ScrollViewEx
          style={styles.scroll}
          onLoadMore={this.onLoadMore.bind(this)}>
          <IndexBanner {...this.props} />
          <IndexProList {...this.props} />
        </ScrollViewEx>
      </View>
    );
  }
}
