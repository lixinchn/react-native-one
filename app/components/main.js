import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
} from 'react-native';
import Index from './index/index.js';
import Share from './share/index.js';
import Home from './home/index.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'index',
    };
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'index'}
          icon={{uri:'index'}}
          title={'夺宝'}
          onPress={() => {
            this.setState({
              selectedTab: 'index'
            });
          }}>
          <Index />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'share'}
          icon={{uri:'share'}}
          title={'晒单'}
          onPress={() => {
            this.setState({
              selectedTab: 'share'
            });
          }}>
          <Share />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'home'}
          icon={{uri:'home'}}
          title={'我的'}
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            });
          }}>
          <Home />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
