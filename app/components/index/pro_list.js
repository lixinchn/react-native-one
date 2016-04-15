import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import GridView from '../../lib/grid_view';
import { fetchProList } from '../../actions/index/pro_list';

export default class IndexProList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProList());
  }

  render() {
    return (
      <GridView
        items={this.props.proList}
        itemsPerRow={2}
        renderItem={this.renderItem}/>
    );
  }

  renderItem(pro) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.pro_img}
          source={{uri: pro.listImage}} />
        <View style={styles.progress_container}>
          <Text style={styles.pro_title} numberOfLines={2}>{pro.title}</Text>
          <View style={styles.progress_v}>
            <View style={styles.progress}></View>
            <Text style={styles.progress_t}>开奖进度</Text>
            <Text style={styles.progress_r}>{Math.floor(pro.proProgress * 100 * 100 / pro.price)}%</Text>
          </View>
        </View>
      </View>
    );
  }
}

let width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
  },

  pro_img: {
    height: 120,
    width: 120,
    margin: 10,
  },

  progress_v: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },

  pro_title: {
    fontSize: 10,
  },

  progress_t: {
    fontSize: 8,
    marginLeft: 5,
  },

  progress_r: {
    fontSize: 8,
    color: 'blue'
  },

  progress: {
    width: 80,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 3,
  },

  progress_container: {
    marginLeft: 5,
    flex: 1,
    flexDirection: 'column',
  }
});

