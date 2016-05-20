import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
  Image,
  TouchableHighlight,
} from 'react-native';
import COMMON_PARAM from '../../constants/common';


const HEADER_HEIGHT = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#FD3934',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
  },

  body: {
    flex: 1,
  },

  back: {
    position: 'absolute',
    left: 10,
  },
});

export default class NavigatorEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBackButtonTop: 0,
    };
  }

  onLeftBackLayout(e) {
    this.setState({'leftBackButtonTop': (HEADER_HEIGHT - e.nativeEvent.layout.height) / 2 + 7})
  }

  onLeftBackPress(route, e) {
    route.passProps.navigator.pop();
  }

  genHeader(route) {
    title = route.title || this.props.title || this.props.initTitle;
    opacityOfLeftBackButton = route.showLeftBackButton ? 1 : 0;
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableHighlight underlayColor={COMMON_PARAM.onPressUnderlayColor} activeOpacity={COMMON_PARAM.onPressActiveOpacity} style={[styles.back, {opacity: opacityOfLeftBackButton, top: this.state.leftBackButtonTop}]} onPress={this.onLeftBackPress.bind(this, route)}>
          <Image resizeMode='contain'  source={require('../../../res/back_left.png')} onLayout={this.onLeftBackLayout.bind(this)} />
        </TouchableHighlight>
      </View>
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.genHeader(route)}
        </View>
        <View style={styles.body}>
          {
            route.component
            ? <route.component {...route.passProps}/>
            : this.props.renderScene(route, navigator)
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <Navigator
        barTintColor={this.props.barTintColor}
        style={styles.container}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
        }} />
    );
  }
}
