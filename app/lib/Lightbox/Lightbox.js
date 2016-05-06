'use strict';

import React, {
  PropTypes,
  View,
  TouchableHighlight,
  Animated,
  Children,
  cloneElement,
  Component,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import LightboxOverlay from './LightboxOverlay';

export default class Lightbox extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isOpen: false,
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      layoutOpacity: new Animated.Value(1),
    };
  }

  getContent() {
    if(this.props.renderContent) {
      return this.props.renderContent();
    } else if(this.props.activeProps) {
      return cloneElement(
        Children.only(this.props.children),
        this.props.activeProps
      );
    }
    return this.props.children;
  }

  getOverlayProps() {
    return {
      isOpen: this.state.isOpen,
      origin: this.state.origin,
      renderHeader: this.props.renderHeader,
      swipeToDismiss: this.props.swipeToDismiss,
      springConfig: this.props.springConfig,
      backgroundColor: this.props.backgroundColor,
      children: this.getContent(),
      onClose: this.onClose.bind(this),
    };
  }

  open() {
    this._root.measure((ox, oy, width, height, px, py) => {
      this.props.onOpen();

      this.setState({
        isOpen: (this.props.navigator ? true : false),
        isAnimating: true,
        origin: {
          width,
          height,
          x: px,
          y: py,
        },
      }, () => {
        if(this.props.navigator) {
          var route = {
            component: LightboxOverlay,
            passProps: this.getOverlayProps(),
          };
          var routes = this.props.navigator.getCurrentRoutes();
          routes.push(route);
          this.props.navigator.immediatelyResetRouteStack(routes);
        } else {
          this.setState({
            isOpen: true,
          });
        }
        setTimeout(() => {
          this.state.layoutOpacity.setValue(0);
        });
      });
    });
  }

  close() {
    throw new Error('Lightbox.close method is deprecated. Use renderHeader(close) prop instead.')
  }

  onClose() {
    this.state.layoutOpacity.setValue(1);
    this.setState({
      isOpen: false,
    }, this.props.onClose);
    if(this.props.navigator) {
      var routes = this.props.navigator.getCurrentRoutes();
      routes.pop();
      this.props.navigator.immediatelyResetRouteStack(routes);
    }
  }

  render() {
    // measure will not return anything useful if we dont attach a onLayout handler on android
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}
        onLayout={() => {}}
      >
        <Animated.View style={{opacity: this.state.layoutOpacity, flex: 1}}>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            onPress={this.open.bind(this)}
            style={{flex: 1}}
          >
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>
        {this.props.navigator ? false : <LightboxOverlay {...this.getOverlayProps()} />}
      </View>
    );
  }
}

Lightbox.propTypes = {
  activeProps:     PropTypes.object,
  renderHeader:    PropTypes.func,
  renderContent:   PropTypes.func,
  underlayColor:   PropTypes.string,
  backgroundColor: PropTypes.string,
  onOpen:          PropTypes.func,
  onClose:         PropTypes.func,
  springConfig:    PropTypes.shape({
    tension:       PropTypes.number,
    friction:      PropTypes.number,
  }),
  swipeToDismiss:  PropTypes.bool,
};

Lightbox.defaultProps = {
  swipeToDismiss: true,
  onOpen: () => {},
  onClose: () => {},
};
