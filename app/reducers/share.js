import {
  REQUEST_ALL_SHARE_ORDER,
  RECEIVE_ALL_SHARE_ORDER,
  RECEIVE_ALL_SHARE_ORDER_FOR_REFRESH,
} from '../constants/action_types';

export default function share(state = {
  allShareOrder: [],
  isFetching: false,
  refresh: false,
}, action) {
  switch (action.type) {
    case REQUEST_ALL_SHARE_ORDER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_ALL_SHARE_ORDER:
      return Object.assign({}, state, {
        allShareOrder: [
            ...state.allShareOrder,
            ...action.allShareOrder,
        ],
        isFetching: false,
      });
    case RECEIVE_ALL_SHARE_ORDER_FOR_REFRESH:
      return Object.assign({}, state, {
        allShareOrder: [
            ...action.allShareOrder,
        ],
        isFetching: false,
        refresh: true,
      });
    default:
      return state;
  }
}