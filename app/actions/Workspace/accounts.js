/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';
import checkConnectionStatus from '../Tezster/Helper/index';
import { RpcRequest } from '../../apis/getAccountBalance';

const {
  __getBalance,
  __getAccounts,
  __activateAccount,
  __activateAccountOperation,
} = require('../../apis/eztz.service');

const config = require('../../apis/config');

const TEZSTER_CONTAINER_NAME = 'tezster';
const LOCAL_STORAGE_NAME = config.storageName;
const url = config.provider;

function checkIsLocalNodeRunning() {
  return new Promise((resolve) => {
    RpcRequest.checkNodeStatus(url)
      .then((res) => {
        if (res.protocol.startsWith('PsCARTHAG')) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch((exp) => {
        return resolve(false);
      });
  });
}

export function toggleAccountsModalAction(modalType) {
  return {
    type: 'TOGGLE_ACCOUNTS_MODAL',
    payload: modalType,
  };
}

export function getAccountsAction({ ...params }) {
  const { networkId } = params.dashboardHeader;
  let IsLocalNodeRunning = false;
  return async (dispatch) => {
    IsLocalNodeRunning = await checkIsLocalNodeRunning();
    if (
      !IsLocalNodeRunning &&
      process.platform.includes('linux') &&
      networkId === 'Localnode'
    ) {
      return dispatch({
        type: 'GET_ACCOUNTS',
        payload: [],
      });
    }
    if (
      !IsLocalNodeRunning &&
      networkId === 'Localnode' &&
      process.platform.includes('linux')
    ) {
      return dispatch({
        type: 'GET_ACCOUNTS',
        payload: [],
      });
    }
    if (params.userAccounts.length === 0) {
      if (localStorage.hasOwnProperty(LOCAL_STORAGE_NAME)) {
        params.userAccounts = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_NAME)
        ).userAccounts;
        params.dashboardHeader.networkId = networkId;
        if (
          IsLocalNodeRunning &&
          networkId === 'Localnode' &&
          params.userAccounts.Localnode.length === 0
        ) {
          params.userAccounts.Localnode = config.identities;
        }
      } else {
        params.userAccounts[networkId.split('-')[0]] =
          IsLocalNodeRunning && networkId === 'Localnode'
            ? config.identities
            : [];
        params.dashboardHeader.networkId = networkId;
      }
    } else {
      params.userAccounts = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_NAME)
      ).userAccounts;
      if (
        params.userAccounts[networkId.split('-')[0]].length === 0 &&
        networkId === 'Localnode'
      ) {
        params.userAccounts[networkId.split('-')[0]] = config.identities;
      }
      params.dashboardHeader.networkId = networkId;
    }
    __getAccounts({ ...params }, (err, accounts) => {
      if (err) {
        return dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err,
        });
      }
      Promise.all(accounts)
        .then((response) => {
          if (!localStorage.hasOwnProperty(LOCAL_STORAGE_NAME)) {
            const userAccounts = {
              Carthagenet: [],
              Localnode: [],
              [networkId.split('-')[0]]: response,
            };
            localStorage.setItem(
              LOCAL_STORAGE_NAME,
              JSON.stringify({ ...config, userAccounts })
            );
          }
          return dispatch({
            type: 'GET_ACCOUNTS',
            payload: response,
          });
        })
        .catch((accountsErr) => {
          return dispatch({
            type: 'GET_ACCOUNTS_ERR',
            payload: accountsErr,
          });
        });
    });
  };
}

export function getBalanceAction(payload) {
  const { networkId } = payload.dashboardHeader;
  const params = { ...payload };
  params.userAccounts = [];
  return async (dispatch) => {
    if (process.platform.includes('linux')) {
      const checkInternetConnectionStatus = {
        connectionType: '',
      };
      checkInternetConnectionStatus.connectionType = 'CHECK_CONTAINER_RUNNING';
      checkInternetConnectionStatus.command = TEZSTER_CONTAINER_NAME;
      const isTezsterContainerRunning = await checkConnectionStatus(
        checkInternetConnectionStatus
      );
      if (isTezsterContainerRunning) {
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: true,
        });
      } else {
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: false,
        });
      }
    }
    return dispatch(getAccountsAction(payload));
  };
}

export function createFaucetAccountsAction(payload) {
  const { networkId } = payload.dashboardHeader;
  const { userAccounts } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    __activateAccountOperation(payload, (err, result) => {
      if (err) {
        const error =
          networkId.split('-')[0] === 'Localnode'
            ? "Faucet account can't be activated on localnode"
            : 'Faucet account already activated \n go for restoring the account';
        swal('Error!', error, 'error');
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: userAccounts[networkId.split('-')[0]],
        });
        return dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
      }
      const activatedAccount = {
        sk: result.privateKey,
        pk: result.publicKey,
        pkh: payload.faucet.pkh,
        label: payload.faucet.label,
        dashboardHeader: payload.dashboardHeader,
      };
      payload.userAccounts.push({ ...activatedAccount });
      Promise.all(
        payload.userAccounts.map(
          async (elem) =>
            await __getBalance({
              ...elem,
              dashboardHeader: payload.dashboardHeader,
            })
        )
      ).then((response) => {
        const __localStorage = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_NAME)
        );
        __localStorage.userAccounts[networkId.split('-')[0]] = response;
        localStorage.setItem(
          LOCAL_STORAGE_NAME,
          JSON.stringify({ ...__localStorage })
        );
        swal('Success!', 'Account created successfully', 'success');
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: response,
        });
        dispatch({
          type: 'TOGGLE_ACCOUNTS_MODAL',
          payload: '',
        });
      });
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
    });
  };
}

export function restoreFaucetAccountAction(payload) {
  const { networkId } = payload.dashboardHeader;
  const __localStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  const { userAccounts } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    __activateAccount(payload, (err, account) => {
      if (err) {
        dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err,
        });
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
      }
      Promise.all([__getBalance({ ...account, ...payload })]).then(
        (response) => {
          const restoredAccount = { ...response[0] };
          restoredAccount.label = payload.label;
          userAccounts[networkId.split('-')[0]].push(restoredAccount);
          payload.userAccounts = userAccounts;
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify({ ...__localStorage, ...payload })
          );
          const msg = payload.hasOwnProperty('msg')
            ? payload.msg
            : 'Account restored successfully';
          swal('Success!', msg, 'success');
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: userAccounts[networkId.split('-')[0]],
          });
          dispatch({
            type: 'TOGGLE_ACCOUNTS_MODAL',
            payload: '',
          });
        }
      );
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
    });
  };
}

export function toggleButtonState() {
  return {
    type: 'BUTTON_LOADING_STATE',
    payload: false,
  };
}
