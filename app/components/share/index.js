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

export default class Share extends Component {
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
          title: '晒单分享',
          id: 'share',
          component: Content,
          passProps: {...this.props}
        }} />
    );
  }
}
