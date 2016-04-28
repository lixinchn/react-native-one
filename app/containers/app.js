import { connect } from 'react-redux';
import Main from '../components/main';

function mapStateToProps(state) {
  const {
    banners,
    proList,
    refresh,
  } = state;

  return {
    banners,
    proList,
    refresh,
  };
}

export default connect(mapStateToProps)(Main);
