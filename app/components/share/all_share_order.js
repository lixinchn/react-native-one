import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import GridView from '../../lib/grid_view';
import { fetchAllShareOrderIfNeeded } from '../../actions/share/all_share_order';

export default class IndexAllShareOrder extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllShareOrderIfNeeded());
  }

  render() {
    return (
      <GridView
        items={this.props.proList}
        itemsPerRow={2}
        renderItem={this.renderItem}/>
    );
  }

  renderItem() {
    return (
      <View style={styles.container} key={pro.roundId}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    alignItems: 'center',
  },
});

