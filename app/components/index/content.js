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
import { fetchBanners } from '../../actions/index/banner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    marginBottom: -35,
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.initStatus();
  }

  initStatus() {
    this.lastRoundId = 0;
    this.lastWeight = 0;
  }

  onLoadMore() {
    this.props.dispatch(fetchProListIfNeeded(this.lastRoundId, this.lastWeight));
  }

  onChooseLastRoundIdAndLastWeight(proList, refresh) {
    if (refresh) {
      this.initStatus();
    }

    proList.forEach((pro) => {
      if (!this.lastRoundId || this.lastRoundId > pro.roundId) {
        this.lastRoundId = pro.roundId;
      }

      if (!this.lastWeight || this.lastWeight > pro.weight) {
        this.lastWeight = pro.weight;
      }
    });
  }

  onRefresh() {
    this.props.dispatch(fetchBanners());
    this.props.dispatch(fetchProListIfNeeded(0, 0, true));
  }

  componentDidUpdate() {
    this.onChooseLastRoundIdAndLastWeight(this.props.index.proList, this.props.index.refresh);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollViewEx
          style={styles.scroll}
          onLoadMore={this.onLoadMore.bind(this)}
          onRefresh={this.onRefresh.bind(this)}>
          <IndexBanner {...this.props} />
          <IndexProList {...this.props} />
        </ScrollViewEx>
      </View>
    );
  }
}
