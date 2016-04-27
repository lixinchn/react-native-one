'use strict';
import React, {
  AppRegistry,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Component,
} from 'react-native';

export default class ScrollViewEx extends Component {
  constructor(props) {
    super(props);
    this.windowHeight = Dimensions.get('window').height;
    this.height = 0;
    this.offset = 0;
  }

  onScroll(e) {
    this.height = e.nativeEvent.contentSize.height;
    this.offset = e.nativeEvent.contentOffset.y;
  }

  onResponderRelease(e) {
    if (this.height && this.windowHeight + this.offset >= this.height + 150) {
      this.props.onLoadMore();
    }
  }

  render() {
    return (
      <ScrollView
        style={this.props.style}
        automaticallyAdjustContentInsets={false}
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={200}
        onResponderRelease={this.onResponderRelease.bind(this)}>
        {this.props.children}
      </ScrollView>
    );
  }
}