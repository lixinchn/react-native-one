import {
  REQUEST_BANNER,
  RECEIVE_BANNER,
  REQUEST_PRO_LIST,
  RECEIVE_PRO_LIST,
} from '../constants/action_types';

export default function banners(state = {
  banners: [],
  proList: [],
}, action) {
  switch (action.type) {
    case REQUEST_BANNER:
      return Object.assign({}, state, {

      });
    case RECEIVE_BANNER:
      return Object.assign({}, state, {
        banners: action.banners,
      });
    case REQUEST_PRO_LIST:
      return Object.assign({}, state, {

      });
    case RECEIVE_PRO_LIST:
      return Object.assign({}, state, {
        proList: action.proList,
      });
    default:
      return state;
  }
}