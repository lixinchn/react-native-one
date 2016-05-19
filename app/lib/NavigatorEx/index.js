import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Navigator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#FD3934',
    height: 60,
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
  },

  body: {
    flex: 1,
  }
});

export default class NavigatorEx extends Component {
  genHeader(route) {
    title = route.title || this.props.title || this.props.initTitle;
    return (
      <View style={styles.header}>
         <Text style={styles.title}>{title}</Text>
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
