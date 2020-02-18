import { __deployContract } from '../../apis/eztz.service';
import swal from 'sweetalert';

export function handleContractsTabChangeAction(tabName) {
  return {
    type: 'CONTRACTS_TAB_TOGGLE',
    payload: tabName
  };
}

export function deployContractAction({ ...params }) {
  return dispatch => {
    __deployContract({ ...params }, (err, response) => {
      swal('Success!', 'Contract deployed successfully', 'success');
      dispatch({
        type: 'DEPLOY_CONTRACT_SUCCESS',
        payload: response
      });
    });
  };
}
