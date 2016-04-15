'use strict';
import React, {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
  Component,
} from 'react-native';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      renderItem: null,
      style: undefined,
      itemsPerRow: 1,
      onEndReached: undefined,
    }
  }

  groupItems(items, itemsPerRow) {
    let itemsGroups = [];
    let group = [];
    items && items.forEach((item) => {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      itemsGroups.push(group);
    }

    return itemsGroups;
  }

  renderGroup(group) {
    let items = group.map((item, index) => {
      return this.props.renderItem(item, index);
    });
    return (
      <View style={styles.group}>
        {items}
      </View>
    );
  }

  render() {
    let groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        style={this.props.style}
        dataSource={ds.cloneWithRows(groups)}
        renderRow={this.renderGroup.bind(this)}
        onEndReached={this.props.onEndReached}
        scrollEnabled={this.props.scrollEnabled}
        pageSize={this.props.pageSize | 1}/>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
