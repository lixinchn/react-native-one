import React, {
  Component,
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
  Navigator,
} from 'react-native';
import Content from './content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Index extends Component {
  renderScene(route, navigator) {
    return (
      <Content {...this.props} title={route.title}/>
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
          id: 'index',
          component: Content,
          passProps: {...this.props}
        }} />
    );
  }
}
