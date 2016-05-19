import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native';


let imageWidth = Dimensions.get('window')['width'] - 20;


export default class ShareDetail extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      imageHeight: [],
    };
  }

  render() {
    // console.log(this.props);
    return (
      <ScrollView style={styles.container} ref='container'>
        <View style={styles.header_container}>
          <Text style={styles.title}>{this.props.shareTitle}</Text>
          <View style={styles.header_container_1}>
            <Text style={[styles.phone, styles.blue_text]}>{this.props.winner.nickname}</Text>
            <Text style={[styles.ctime, styles.normal_text]}>{this.props.winner.ctime}</Text>
          </View>
        </View>
        <View style={styles.spliter}></View>
        <View style={styles.body}>
          <Text style={[styles.normal_text, styles.little_marginTop]}>获奖商品: <Text style={styles.blue_text}>{this.props.title}</Text></Text>
          <Text style={[styles.normal_text, styles.little_marginTop]}>商品期号: {this.props.roundId}</Text>
          <Text style={[styles.normal_text, styles.little_marginTop]}>本期参与: <Text style={styles.red_text}>{this.props.winner.winnerInTime}</Text>人次</Text>
          <Text style={[styles.normal_text, styles.little_marginTop]}>幸运号码: <Text style={styles.red_text}>{this.props.winner.luckNum}</Text></Text>
          <Text style={[styles.normal_text, styles.little_marginTop]}>揭晓时间: {this.props.ctime}</Text>
          <Text style={[styles.normal_text, styles.little_marginTop]}>{this.props.comment}</Text>
          {this.renderImage(this.props.imageList)}
        </View>
      </ScrollView>
    );
  }

  renderImage(imageList) {
    images = imageList.split(';').slice(0, -1);
    return (
        images.map((image, index) =>
          <Image key={index} resizeMode='contain' style={[styles.image, {'height': this.state.imageHeight[index] || 200}]} source={{uri: image}} />
        )
    );
  }

  componentDidMount() {
    images = this.props.imageList.split(';').slice(0, -1);
    images.map((image, index) => {
      Image.getSize(image, (width, height) => {
        this.state.imageHeight[index] = imageWidth * height / width;
        this.setState({'imageHeight': this.state.imageHeight});
      });
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
  },

  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },

  header_container: {
    height: 50,
  },

  header_container_1: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },

  phone: {
    flex: 1,
  },

  blue_text: {
    fontSize: 10,
    color: '#2876e0',
  },

  red_text: {
    fontSize: 10,
    color: '#ff4747',
  },

  ctime: {
    width: 120,
  },

  normal_text: {
    fontSize: 10,
    color: '#666',
  },

  spliter: {
    marginTop: 5,
    borderStyle: 'dashed',
    borderWidth: 0.3,
    borderColor: '#999',
  },

  body: {
    flex: 1,
  },

  little_marginTop: {
    marginTop: 5,
  },

  image: {
    width: imageWidth,
    marginBottom: 10,
    marginTop: 10,
  },
});

