import { connect } from 'react-redux';
import Main from '../components/main';

function mapStateToProps(state) {
  return {
    index: {
      'banners': state.index.banners,
      'proList': state.index.proList,
      'refresh': state.index.refresh,
    },

    share: {
      'allShareOrder': state.share.allShareOrder,
      'refresh': state.share.refresh,
    }
  };
}

export default connect(mapStateToProps)(Main);
