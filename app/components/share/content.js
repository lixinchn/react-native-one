import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import IndexAllShareOrder from './all_share_order';
import ScrollViewEx from '../../lib/ScrollViewEx'
import { fetchAllShareOrderIfNeeded } from '../../actions/share/all_share_order';

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
    this.lastRoundId = -1;
  }

  onLoadMore() {
    this.props.dispatch(fetchAllShareOrderIfNeeded(this.lastRoundId));
  }

  onChooseLastRoundId(allShareOrder, refresh) {
    if (refresh) {
      this.initStatus();
    }

    allShareOrder.forEach((pro) => {
      if (!this.lastRoundId || this.lastRoundId > pro.roundId) {
        this.lastRoundId = pro.roundId;
      }
    });
  }

  onRefresh() {
    this.initStatus();
    this.props.dispatch(fetchAllShareOrderIfNeeded(this.lastRoundId, true));
  }

  componentDidUpdate() {
    this.onChooseLastRoundId(this.props.share.allShareOrder, this.props.share.refresh);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollViewEx
          style={styles.scroll}
          onLoadMore={this.onLoadMore.bind(this)}
          onRefresh={this.onRefresh.bind(this)}>
          <IndexAllShareOrder {...this.props} />
        </ScrollViewEx>
      </View>
    );
  }
}
