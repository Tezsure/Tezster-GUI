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
      dispatch({
        type: 'DEPLOY_CONTRACT_SUCCESS',
        payload: response
      });
    });
  };
}
