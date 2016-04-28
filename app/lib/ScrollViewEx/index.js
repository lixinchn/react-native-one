'use strict';
import React, {
  AppRegistry,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Component,
} from 'react-native';
import Indicator from './indicator';
const INDICATOR_HEIGHT = 40;
const PULL_TO_REFRESH_THRESHOLD = -50
const ROTATION_MIN_DEG = -180
const PULL_TO_REFRESH_INDICATOR = '  下拉可以刷新';
const RELEASE_TO_REFRESH_INDICATOR = '  放手立即刷新';

export default class ScrollViewEx extends Component {
  constructor(props) {
    super(props);
    this.windowHeight = Dimensions.get('window').height;
    this.height = 0;
    this.offset = 0;
    this.state = {
      expand: -INDICATOR_HEIGHT,
      indicatorRotationDeg: 0,
      indicatorText: PULL_TO_REFRESH_INDICATOR
    }
  }

  onScroll(e) {
    this.height = e.nativeEvent.contentSize.height;
    this.offset = e.nativeEvent.contentOffset.y;

    if (this.offset <= PULL_TO_REFRESH_THRESHOLD && this.state.indicatorRotationDeg === 0) {
      this.onAnimateIndicator();
    }
  }

  onAnimateIndicator() {
    let self = this;
      (function loop () {
        var animation = requestAnimationFrame(loop)
        self.setState({indicatorRotationDeg: self.state.indicatorRotationDeg - 30})
        if (self.state.indicatorRotationDeg <= ROTATION_MIN_DEG) {
          cancelAnimationFrame(animation);
          self.setState({indicatorText: RELEASE_TO_REFRESH_INDICATOR})
        }
      })();  
  }

  onResponderRelease(e) {
    // console.log('height: %s, windowHeight: %s, offset: %s', this.height, this.windowHeight, this.offset);
    if (this.height && this.windowHeight + this.offset >= this.height + 150) {
      this.props.onLoadMore();
    } else if (this.offset <= PULL_TO_REFRESH_THRESHOLD) {
      this.props.onRefresh();
    }

    setTimeout(() => {
      this.setState({indicatorRotationDeg: 0, indicatorText: PULL_TO_REFRESH_INDICATOR});
    }, 200);
  }

  render() {
    return (
      <ScrollView
        style={this.props.style}
        automaticallyAdjustContentInsets={false}
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={200}
        onResponderRelease={this.onResponderRelease.bind(this)}>
        <View style={{top: this.state.expand}}>
          <Indicator
            rotationDeg={this.state.indicatorRotationDeg}
            displayText={this.state.indicatorText}
          />
          {this.props.children}
        </View>
      </ScrollView>
    );
  }
}