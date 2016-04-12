import {
  REQUEST_BANNER,
  RECEIVE_BANNER,
} from '../constants/action_types';

export default function banners(state = {
  banners: [],
}, action) {
  switch (action.type) {
    case REQUEST_BANNER:
      return Object.assign({}, state, {

      });
    case RECEIVE_BANNER:
      return Object.assign({}, state, {
        banners: action.banners
      });
    default:
      return state;
  }
}