import {
  SEND_GET_EDITABLE_LEVEL, SUCCEED_GET_EDITABLE_LEVEL, FAIL_GET_EDITABLE_LEVEL
} from '../constants/actionTypes';
import { SERVER_HOST, API_WIPS } from '../constants/api';
import { ajaxPattern } from '../services/ajax';

const sendGetWIP = () => ({ type: SEND_GET_EDITABLE_LEVEL });
const succeedGetWIP = levelData => ({ type: SUCCEED_GET_EDITABLE_LEVEL, levelData });
const failGetWIP = error => ({ type: FAIL_GET_EDITABLE_LEVEL, error });

export default id => {
  let url = `${SERVER_HOST}${API_WIPS}/${id}`;
  let succeed = ({ data: { levelData } }) => succeedGetWIP(levelData);
  let fail = ({ data: { error } }) => failGetWIP(error);
  return ajaxPattern({ before: sendGetWIP, url, succeed, fail });
};
