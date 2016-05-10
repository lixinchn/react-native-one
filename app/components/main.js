import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
} from 'react-native';
import NavigatorEx from '../lib/NavigatorEx';
import Index from './index/index.js';
import Share from './share/index.js';
import Home from './home/index.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'share',
      tabData: this.genTabData(),
    };
  }

  genTabData() {
    return {
      'index': {
        'name': 'index',
        'icon': require('../../res/btn_index_normal.png'),
        'title': '夺宝',
        'content': Index,
      },
      'share': {
        'name': 'share',
        'icon': require('../../res/btn_share_normal.png'),
        'title': '晒单',
        'content': Share,
      },
      'home': {
        'name': 'home',
        'icon': require('../../res/btn_home_normal.png'),
        'title': '我的',
        'content': Home
      }
    };
  }

  genTitle(selectedTab) {
    console.log(selectedTab);
    return this.state.tabData[selectedTab].title;
  }

  renderTabBar(route, navigator) {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor='#FF4747'>
        {
          Object.values(this.state.tabData).map((tab) => 
            <TabBarIOS.Item
              selected={this.state.selectedTab === tab.name}
              icon={tab.icon}
              title={tab.title}
              key={tab.name}
              onPress={() => {
                this.setState({
                  selectedTab: tab.name
                });
              }}>
              <tab.content {...this.props} title={tab.title} route={route} navigator={navigator}/>
            </TabBarIOS.Item>)
        }
        </TabBarIOS>
    );
  }

  render() {
    return (
      <NavigatorEx
        barTintColor='#FD3934'
        style={styles.container}
        title={this.genTitle(this.state.selectedTab)}
        renderScene={this.renderTabBar.bind(this)}
      />
    );
  }
}
