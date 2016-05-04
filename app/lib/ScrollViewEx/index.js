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
const PULL_TO_REFRESH_THRESHOLD = -70;
const PULL_TO_LOAD_THRESHOLD = 100;
const PULL_TO_LOAD_CHANGE_OPACITY_THRESHOLD = 50;
const ROTATION_MIN_DEG = -180;
const ROTATION_MAX_DEG = 0;
const ANIMATION_DEG_PER_TIME = 30;
const PULL_TO_REFRESH_INDICATOR = '  下拉可以刷新';
const RELEASE_TO_REFRESH_INDICATOR = '  放手立即刷新';
const PULL_TO_LOAD_MORE_INDICATOR = '  上拉加载更多';
const RELEASE_TO_LOAD_MORE_INDICATOR = '  放手立即加载';

export default class ScrollViewEx extends Component {
  constructor(props) {
    super(props);
    this.windowHeight = Dimensions.get('window').height;
    this.height = 0;
    this.offset = 0;
    this.state = {
      expand: -INDICATOR_HEIGHT,
      indicatorUpRotationDeg: 0,
      indicatorUpText: PULL_TO_REFRESH_INDICATOR,
      indicatorDownRotationDeg: ROTATION_MIN_DEG,
      indicatorDownText: PULL_TO_LOAD_MORE_INDICATOR,
      opacityDownIndicator: 0,
    }
  }

  onScroll(e) {
    this.height = e.nativeEvent.contentSize.height;
    this.offset = e.nativeEvent.contentOffset.y;

    // up indicator status
    if (this.offset <= PULL_TO_REFRESH_THRESHOLD && this.state.indicatorUpRotationDeg === ROTATION_MAX_DEG) {
      this.onAnimateIndicatorRefreshUp();
    } else if (this.offset >= PULL_TO_REFRESH_THRESHOLD && this.state.indicatorUpRotationDeg === ROTATION_MIN_DEG) {
      this.onAnimateIndicatorRefreshDown();
    }

    // down indicator opacity
    if (this.height && this.windowHeight + this.offset >= this.height - PULL_TO_LOAD_CHANGE_OPACITY_THRESHOLD) {
      this.setState({opacityDownIndicator: 1});
    }

    // down indicator status
    if (this.height && this.state.indicatorDownRotationDeg === ROTATION_MIN_DEG && this.windowHeight + this.offset >= this.height + PULL_TO_LOAD_THRESHOLD) {
      this.onAnimateIndicatorLoadDown();
    } else if (this.height && this.state.indicatorDownRotationDeg === ROTATION_MAX_DEG && this.windowHeight + this.offset < this.height + PULL_TO_LOAD_THRESHOLD) {
      this.onAnimateIndicatorLoadUp();
    }
  }

  onAnimateIndicatorRefreshUp() {
    let self = this;
    (function loop () {
      var animation = requestAnimationFrame(loop)
      self.setState({indicatorUpRotationDeg: self.state.indicatorUpRotationDeg - ANIMATION_DEG_PER_TIME})
      if (self.state.indicatorUpRotationDeg <= ROTATION_MIN_DEG) {
        cancelAnimationFrame(animation);
        self.setState({indicatorUpText: RELEASE_TO_REFRESH_INDICATOR})
      }
    })();
  }

  onAnimateIndicatorRefreshDown() {
    let self = this;
    (function loop () {
      var animation = requestAnimationFrame(loop)
      self.setState({indicatorUpRotationDeg: self.state.indicatorUpRotationDeg + ANIMATION_DEG_PER_TIME})
      if (self.state.indicatorUpRotationDeg >= ROTATION_MAX_DEG) {
        cancelAnimationFrame(animation);
        self.setState({indicatorUpText: PULL_TO_REFRESH_INDICATOR})
      }
    })();
  }

  onAnimateIndicatorLoadDown() {
    let self = this;
    (function loop () {
      var animation = requestAnimationFrame(loop)
      self.setState({indicatorDownRotationDeg: self.state.indicatorDownRotationDeg + ANIMATION_DEG_PER_TIME})
      if (self.state.indicatorDownRotationDeg >= ROTATION_MAX_DEG) {
        cancelAnimationFrame(animation);
        self.setState({indicatorDownText: RELEASE_TO_LOAD_MORE_INDICATOR})
      }
    })();
  }

  onAnimateIndicatorLoadUp() {
    let self = this;
    (function loop () {
      var animation = requestAnimationFrame(loop)
      self.setState({indicatorDownRotationDeg: self.state.indicatorDownRotationDeg - ANIMATION_DEG_PER_TIME})
      if (self.state.indicatorDownRotationDeg <= ROTATION_MIN_DEG) {
        cancelAnimationFrame(animation);
        self.setState({indicatorDownText: PULL_TO_LOAD_MORE_INDICATOR})
      }
    })();
  }

  onResponderRelease(e) {
    // console.log('height: %s, windowHeight: %s, offset: %s', this.height, this.windowHeight, this.offset);
    if (this.height && this.windowHeight + this.offset >= this.height + PULL_TO_LOAD_THRESHOLD) {
      this.props.onLoadMore();
    } else if (this.offset <= PULL_TO_REFRESH_THRESHOLD) {
      this.props.onRefresh();
    }

    setTimeout(() => {
      this.setState({indicatorUpRotationDeg: 0, indicatorUpText: PULL_TO_REFRESH_INDICATOR});
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
            rotationDeg={this.state.indicatorUpRotationDeg}
            displayText={this.state.indicatorUpText}
          />
          {this.props.children}
          <Indicator
            rotationDeg={this.state.indicatorDownRotationDeg}
            displayText={this.state.indicatorDownText}
            opacity={this.state.opacityDownIndicator}
          />
        </View>
      </ScrollView>
    );
  }
}