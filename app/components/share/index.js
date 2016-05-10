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
  render() {
    return (
      <Content {...this.props}/>
    );
  }
}
