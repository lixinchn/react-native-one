import {
  REQUEST_BANNER,
  RECEIVE_BANNER,
} from '../../constants/action_types';
import COMMON_PARAM from '../../constants/common';

const API_ROOT = COMMON_PARAM.host + 'banner.do?';

function requestBanner() {
  return {
    type: REQUEST_BANNER,
  };
}

function receiveBanner(banners) {
  return {
    type: RECEIVE_BANNER,
    banners
  };
}

export function fetchBanners() {
  return dispatch => {
    // dispatch(requestBanner());
    return fetch(API_ROOT + `app_version=${COMMON_PARAM.app_version}&os_type=${COMMON_PARAM.os_type}&channel=${COMMON_PARAM.channel}&uid=0`)
            .then(response => response.json())
            .then(json => dispatch(receiveBanner(json.data)))
  }
}
