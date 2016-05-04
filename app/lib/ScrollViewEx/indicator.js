'use strict'

import React, {
  View,
  ActivityIndicatorIOS,
  Image,
  PropTypes,
  Text,
} from 'react-native';

export default class Indicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={[styles.indicator_wrap, {opacity: this.props.opacity}]}>
        <View style={{transform: [{rotate: this.props.rotationDeg + 'deg'}]}}><Text>↓</Text></View>
        <Text>{this.props.displayText}</Text>
      </View>
    )
  }
}

const styles = React.StyleSheet.create({
  indicator_wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    marginBottom: 20,
    opacity: 0,
  },
});

Indicator.propTypes = {
  needPull: PropTypes.bool
}