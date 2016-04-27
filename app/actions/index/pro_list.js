import {
  REQUEST_PRO_LIST,
  RECEIVE_PRO_LIST,
} from '../../constants/action_types';
import COMMON_PARAM from '../../constants/common';

const API_ROOT = COMMON_PARAM.host + 'list_pro_common.do?';

function requestProList() {
  return {
    type: REQUEST_PRO_LIST,
  };
}

function receiveProList(proList) {
  return {
    type: RECEIVE_PRO_LIST,
    proList,
  };
}

function shouldFetchProList(state) {
  const { isFetching } = state;
  return !isFetching;
}

export function fetchProListIfNeeded(lastRoundId = 0, lastWeight = 0) {
  return (dispatch, getState) => {
    if (shouldFetchProList(getState())) {
      return fetch(API_ROOT + `app_version=${COMMON_PARAM.app_version}&os_type=${COMMON_PARAM.os_type}&channel=${COMMON_PARAM.channel}&last_round_id=${lastRoundId}&last_weight=${lastWeight}&uid=0`)
              .then(response => response.json())
              .then(json => {dispatch(receiveProList(json.data))})
    }
  };
}
