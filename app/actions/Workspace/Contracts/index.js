import swal from 'sweetalert';

import {
  HandleContractErrorsHelper,
  ContractDeployedStatusHelper,
} from './helper.contract';

const {
  DeployContractAPI,
  InvokeContractAPI,
  GetStorageAPI,
} = require('./api.contract');
const { GetBalanceAPI } = require('../Accounts/api.accounts');

export function getAccountBalanceAction(args) {
  return (dispatch) => {
    GetBalanceAPI(args)
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

export function deployContractAction(args) {
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    DeployContractAPI(args, (err, response) => {
      if (err) {
        const error = HandleContractErrorsHelper(
          err.message || 'error in deploying contract'
        );
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

export function getContractStorageAction(args) {
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    GetStorageAPI(args, (err, response) => {
      if (err) {
        const error = HandleContractErrorsHelper(
          err.message || 'Unable to fetch storage for selected contract'
        );
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

export function handleInvokeContractAction(args) {
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    ContractDeployedStatusHelper(args, (contractError, contractResponse) => {
      if (contractError) {
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        swal(
          'Error!',
          `\n404 Contract not found on the selected network`,
          'error'
        );
      }
    });
    InvokeContractAPI(args, (err, response) => {
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

export function handleContractsTabChangeAction(TAB_NAME) {
  return {
    type: 'CONTRACTS_TAB_TOGGLE',
    payload: TAB_NAME,
  };
}
