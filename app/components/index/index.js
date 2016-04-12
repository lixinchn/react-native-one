import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
} from 'react-native';
import Content from './content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Index extends Component {
  renderScene() {
    return (
      <Content {...this.props} />
    );
  }
  render() {
    return (
      <Navigator
        barTintColor='#FD3934'
        style={styles.container}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          title: '夺宝',
          component: Content,
          passProps: {...this.props}
        }} />
    );
  }
}
