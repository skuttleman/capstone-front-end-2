import {
  SEND_GET_INVITATIONS, SUCCEED_GET_INVITATIONS, FAIL_GET_INVITATIONS
} from '../../constants/actionTypes';
import { SERVER_HOST, API_GAMES } from '../../constants/api';
import { ajaxPattern } from '../../services/ajax';

const sendGetInvitations = () => ({ type: SEND_GET_INVITATIONS });
const succeedGetInvitations = invitations => ({ type: SUCCEED_GET_INVITATIONS, invitations });
const failGetInvitations = error => ({ type: FAIL_GET_INVITATIONS, error });

export default () => {
  let url = `${SERVER_HOST}${API_GAMES}/invitations`;
  let succeed = ({ data }) => succeedGetInvitations(data);
  let fail = ({ data }) => failGetInvitations(data);
  return ajaxPattern({ before: sendGetInvitations, url, succeed, fail });
};
