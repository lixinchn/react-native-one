import { connect } from 'react-redux';
import Main from '../components/main';

function mapStateToProps(state) {
  const {
    banners,
  } = state;

  return {
    banners
  };
}

export default connect(mapStateToProps)(Main);
