import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';
import { fetchAllShareOrderIfNeeded } from '../../actions/share/all_share_order';
import Lightbox from '../../lib/Lightbox/Lightbox';
import GridView from '../../lib/grid_view';
import ShareDetail from './share_detail';


const DEFAULT_AVATAR = 'http://api.duo17.com/webapp/one_dollar/dest/img/avatar.png';

export default class IndexAllShareOrder extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      imageHeight: 0,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchAllShareOrderIfNeeded());
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        dataSource={ds.cloneWithRows(this.props.share.allShareOrder)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}/>
    );
  }

  renderRow(order) {
    // console.log(order);

    return (
      <TouchableHighlight style={styles.container} key={order.roundId}>
        <View style={styles.list}>
          <View style={styles.left}>
            <Image
              style={styles.avatar}
              source={{uri: order.winner.figureUrl || DEFAULT_AVATAR}} />
          </View>
          <View style={styles.right}>
            <View style={styles.right_header}>
              <Text style={styles.nickname}>{order.winner.nickname}</Text>
              <Text style={styles.win_time}>{order.winner.ctime}</Text>
            </View>
            <View style={styles.comment_box}>
              <Text style={styles.comment_title}>{order.shareTitle}</Text>
              <View style={styles.spliter}></View>
              <Text style={styles.comment_content} numberOfLines={3}>{order.comment}</Text>
              <View style={styles.image_box} onLayout={this.onLayout.bind(this)}>
                {this.renderImage(order)}
              </View>
              <View style={styles.title_box}>
                <Text style={styles.comment_content}>{order.title}</Text>
              </View>
              <View style={styles.tail_box}>
                <Text style={styles.round}>{'期号：' + order.roundId}</Text>
                <TouchableHighlight underlayColor='#f0f8ff' activeOpacity={0.5} onPress={this.onDetailPress.bind(this, order)}><Text style={styles.detail}>{'查看详情'}</Text></TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderImage(order) {
    images = order.imageList.split(';').slice(0, 3);
    return (
        images.map((image, index) =>
          <Lightbox key={order.roundId + index} style={[styles.image_light_box, {height: this.state.imageHeight}]} >
            <Image style={styles.image} source={{uri: image}} />
          </Lightbox>
        )
    );
  }

  onLayout(e) {
    if (this.state.imageHeight !== 0) return;
    let {x, y, width, height} = e.nativeEvent.layout;
    this.setState({'imageHeight': width / 3});
  }

  onDetailPress(order) {
    this.props.navigator.push({
      name: 'share_detail',
      title: '晒单详情',
      component: ShareDetail,
      passProps: order,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  list: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
  },

  left: {
    width: 80,
  },

  right: {
    flex: 1,
    marginRight: 20,
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 20,
  },

  right_header: {
    flexDirection: 'row',
    height: 10,
  },

  nickname: {
    fontSize: 10,
    color: '#2876e0',
    flex: 1
  },

  win_time: {
    fontSize: 10,
    color: '#999',
    width: 105,
  },

  comment_box: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 10,
  },

  comment_title: {
    fontSize: 12,
    marginBottom: 5,
  },

  comment_content: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },

  spliter: {
    marginTop: 5,
    borderStyle: 'dashed',
    borderWidth: 0.3,
    borderColor: '#999',
  },

  image_light_box: {
    flex: 1,
  },

  image_box: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },

  image: {
    resizeMode: 'cover',
    flex: 1,
  },

  title_box: {
    height: 20,
    marginTop: 10,
  },

  tail_box: {
    flex: 1,
    flexDirection: 'row',
  },

  round: {
    fontSize: 10,
    color: '#666',
    flex: 1,
  },

  detail: {
    fontSize: 10,
    width: 40,
    color: '#2876e0',
  }
});

