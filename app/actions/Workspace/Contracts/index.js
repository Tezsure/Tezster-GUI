/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';

import {
  HandleContractErrorsHelper,
  ContractDeployedStatusHelper,
} from './helper.contract';
import { storageName } from '../../../db-config/tezster.config';

const {
  DeployContractAPI,
  InvokeContractAPI,
  GetStorageAPI,
  GetContractFromContractIdAPI,
} = require('./api.contract');
const { GetBalanceAPI } = require('../Accounts/api.accounts');

const LOCAL_STORAGE_NAME = storageName;

export function getAccountBalanceAction(args) {
  return (dispatch) => {
    GetBalanceAPI(args)
      .then((response) => {
        return dispatch({
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
    // eslint-disable-next-line no-unused-vars
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
        const error = HandleContractErrorsHelper(
          err.message || 'error in deploying contract'
        );
        swal('Error!', `Contract call failed ${error}`, 'error');
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

export function handleAddContractAction(args) {
  const { contractAddress } = args;
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    GetContractFromContractIdAPI(args, (err, response) => {
      if (err) {
        swal('Error!', `Contract addition failed ${err.toString()}`, 'error');
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        return dispatch({
          type: 'DEPLOY_CONTRACT_ERR',
          payload: response,
        });
      }
      swal(
        'Success!',
        `Contract ${contractAddress} added successfully`,
        'success'
      );
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      return dispatch({
        type: 'DEPLOY_CONTRACT_SUCCESS',
        payload: contractAddress,
      });
    });
  };
}

export function deleteContractAction(args) {
  return (dispatch) => {
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    LocalStorage.contracts[networkName] = LocalStorage.contracts[
      networkName
    ].filter((elem) => elem.contractAddress !== args.contractAddress);
    localStorage.setItem(
      LOCAL_STORAGE_NAME,
      JSON.stringify({ ...LocalStorage })
    );
    swal('Success!', 'Contract deleted sucessfully', 'success');
    return dispatch({
      type: 'DEPLOY_CONTRACT_SUCCESS',
      payload: LocalStorage.contracts[networkName],
    });
  };
}
