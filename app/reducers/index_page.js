import {
  REQUEST_BANNER,
  RECEIVE_BANNER,
  REQUEST_PRO_LIST,
  RECEIVE_PRO_LIST,
  RECEIVE_PRO_LIST_FOR_REFRESH,
} from '../constants/action_types';

export default function index(state = {
  banners: [],
  proList: [],
  isFetching: false,
  refresh: false,
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
        isFetching: true,
      });
    case RECEIVE_PRO_LIST:
      return Object.assign({}, state, {
        proList: [
            ...state.proList,
            ...action.proList,
        ],
        isFetching: false,
      });
    case RECEIVE_PRO_LIST_FOR_REFRESH:
      return Object.assign({}, state, {
        proList: [
            ...action.proList,
        ],
        isFetching: false,
        refresh: true,
      });
    default:
      return state;
  }
}