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
    // backgroundColor: '#FEFEFE',
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
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor='#FF4747'>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'index'}
          icon={require('../../res/btn_index_normal.png')}
          title={'夺宝'}
          onPress={() => {
            this.setState({
              selectedTab: 'index'
            });
          }}>
          <Index {...this.props}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'share'}
          icon={require('../../res/btn_share_normal.png')}
          title={'晒单'}
          onPress={() => {
            this.setState({
              selectedTab: 'share'
            });
          }}>
          <Share {...this.props}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'home'}
          icon={require('../../res/btn_home_normal.png')}
          title={'我的'}
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            });
          }}>
          <Home {...this.props}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
