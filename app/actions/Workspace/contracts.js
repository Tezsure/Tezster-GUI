import swal from 'sweetalert';
import { __deployContract } from '../../apis/eztz.service';

export function handleContractsTabChangeAction(tabName) {
  return {
    type: 'CONTRACTS_TAB_TOGGLE',
    payload: tabName
  };
}

export function deployContractAction({ ...params }) {
  return dispatch => {
    __deployContract({ ...params }, (err, response) => {
      if (err) {
        swal('Error!', 'Contract deployment failed', 'error');
        dispatch({
          type: 'DEPLOY_CONTRACT_ERR',
          payload: response
        });
      }
      swal('Success!', `Contract ${response} deployed successfully`, 'success');
      dispatch({
        type: 'DEPLOY_CONTRACT_SUCCESS',
        payload: response
      });
    });
  };
}
