import {
  REQUEST_ALL_SHARE_ORDER,
  RECEIVE_ALL_SHARE_ORDER,
  RECEIVE_ALL_SHARE_ORDER_FOR_REFRESH,
} from '../../constants/action_types';
import COMMON_PARAM from '../../constants/common';

const API_ROOT = COMMON_PARAM.host + 'all_share_order.do?';

function requestAllShareOrder() {
  return {
    type: REQUEST_ALL_SHARE_ORDER,
  };
}

function receiveAllShareOrder(allShareOrder, refresh) {
  return {
    type: !refresh ? RECEIVE_ALL_SHARE_ORDER : RECEIVE_ALL_SHARE_ORDER_FOR_REFRESH,
    allShareOrder,
  };
}

function shouldFetchAllShareOrder(state) {
  const { isFetching } = state;
  return !isFetching;
}

export function fetchAllShareOrderIfNeeded(lastRoundId = -1, refresh = false) {
  return (dispatch, getState) => {
    if (shouldFetchAllShareOrder(getState())) {
      return fetch(API_ROOT + `app_version=${COMMON_PARAM.app_version}&os_type=${COMMON_PARAM.os_type}&channel=${COMMON_PARAM.channel}&last_round_id=${lastRoundId}&uid=-1`)
              .then(response => response.json())
              .then(json => {dispatch(receiveAllShareOrder(json.data || [], refresh))})
    }
  };
}
