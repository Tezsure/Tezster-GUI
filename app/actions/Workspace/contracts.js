/* eslint-disable promise/always-return */
import swal from 'sweetalert';
import {
  __deployContract,
  __getBalance,
  __invokeContract
} from '../../apis/eztz.service';

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

export function getAccountBalanceAction({ ...params }) {
  return dispatch => {
    __getBalance({ ...params })
      .then(response => {
        dispatch({
          type: 'GET_CONTRACT_AMOUNT',
          payload: response.balance
        });
      })
      .catch(err => {
        dispatch({
          type: 'GET_CONTRACT_AMOUNT_ERR',
          payload: err
        });
      });
  };
}

export function handleInvokeContractAction({ ...params }) {
  return dispatch => {
    __invokeContract({ ...params }, (err, response) => {
      if (err) {
        dispatch({
          type: 'INVOKE_CONTRACT_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'INVOKE_CONTRACT',
        payload: response
      });
    });
  };
}
