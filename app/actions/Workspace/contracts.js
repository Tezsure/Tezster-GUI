/* eslint-disable no-prototype-builtins */
/* eslint-disable promise/always-return */
import swal from 'sweetalert';
import {
  __deployContract,
  __getBalance,
  __getStorage,
  __invokeContract,
} from '../../apis/eztz.service';

export function handleContractsTabChangeAction(tabName) {
  return {
    type: 'CONTRACTS_TAB_TOGGLE',
    payload: tabName,
  };
}

export function deployContractAction({ ...params }) {
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    __deployContract({ ...params }, (err, response) => {
      if (err) {
        const error = err.hasOwnProperty('message')
          ? err.message.replace(/(?:\r\n|\r|\n|\s\s+)/g, ' ')
          : '';

        swal('Error!', `Contract deployment failed ${error}`, 'error');
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        return dispatch({
          type: 'DEPLOY_CONTRACT_ERR',
          payload: response,
        });
      }
      swal('Success!', `Contract ${response} deployed successfully`, 'success');
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      return dispatch({
        type: 'DEPLOY_CONTRACT_SUCCESS',
        payload: response,
      });
    });
  };
}

export function getContractStorageAction({ ...params }) {
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    __getStorage({ ...params }, (err, response) => {
      if (err) {
        let error = err.hasOwnProperty('message')
          ? `Sorry could not fetch storage value for selected contract \n ${err.message.replace(
              /(?:\r\n|\r|\n|\s\s+)/g,
              ''
            )}`
          : 'Sorry could not fetch storage value for selected contract';
        if (err === 'Not Found') {
          error = `Unable to fetch storage from contract 404 Not Found`;
        }
        swal('Error!', error, 'error');
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        return dispatch({
          type: 'DEPLOY_CONTRACT_STORAGE_ERR',
          payload: err,
        });
      }
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      return dispatch({
        type: 'DEPLOY_CONTRACT_STORAGE',
        payload: response,
      });
    });
  };
}

export function getAccountBalanceAction({ ...params }) {
  return (dispatch) => {
    __getBalance({ ...params })
      .then((response) => {
        dispatch({
          type: 'GET_CONTRACT_AMOUNT',
          payload: response.balance,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'GET_CONTRACT_AMOUNT_ERR',
          payload: err,
        });
      });
  };
}

export function handleInvokeContractAction({ ...params }) {
  const checkContractUrl = `http://localhost:18731/chains/main/blocks/head/context/contracts/${params.selectedContracts}`;
  const { networkId } = params.dashboardHeader;
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    let errorFlag = '';
    if (networkId === 'Localnode') {
      fetch(checkContractUrl).then((resp) => {
        if (resp.status === 404) {
          errorFlag = `\n404 Contract not found on the Localnode`;
        }
      });
    }
    __invokeContract({ ...params }, (err, response) => {
      if (err) {
        const error = err.hasOwnProperty('message')
          ? err.message.replace(/(?:\r\n|\r|\n|\s\s+)/g, ' ')
          : '';
        swal('Error!', `Contract call failed ${error || errorFlag}`, 'error');
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        return dispatch({
          type: 'INVOKE_CONTRACT_ERR',
          payload: err,
        });
      }
      swal('Success!', `${response} originated contract`, 'success');
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      return dispatch({
        type: 'INVOKE_CONTRACT',
        payload: response,
      });
    });
  };
}
