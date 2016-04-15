import { connect } from 'react-redux';
import Main from '../components/main';

function mapStateToProps(state) {
  const {
    banners,
    proList,
  } = state;

  return {
    banners,
    proList,
  };
}

export default connect(mapStateToProps)(Main);
