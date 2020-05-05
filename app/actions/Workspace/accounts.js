/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';
import { exec } from 'child_process';

const {
  __getBalance,
  __getAccounts,
  __activateAccount,
  __activateAccountOperation,
} = require('../../apis/eztz.service');

const config = require('../../apis/config');

function checkIsLocalNodeRunning() {
  return new Promise((resolve) => {
    exec(
      'tezster get-balance tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      (err, stdout) => {
        if (err || stdout.split('ECONNREFUSED').length > 1) {
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
}

export function toggleAccountsModalAction(modalType) {
  return {
    type: 'TOGGLE_ACCOUNTS_MODAL',
    payload: modalType,
  };
}

export function getAccountsAction({ ...params }) {
  let { networkId } = params.dashboardHeader;
  let IsLocalNodeRunning = false;
  return async (dispatch) => {
    IsLocalNodeRunning = await checkIsLocalNodeRunning();
    networkId =
      !IsLocalNodeRunning && networkId === 'Localnode'
        ? 'Carthagenet-Tezster'
        : networkId;
    if (params.userAccounts.length === 0) {
      if (localStorage.hasOwnProperty('tezsure')) {
        params.userAccounts = JSON.parse(
          localStorage.getItem('tezsure')
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
        localStorage.getItem('tezsure')
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
          if (!localStorage.hasOwnProperty('tezsure')) {
            const userAccounts = {
              Carthagenet: [],
              Localnode: [],
              [networkId.split('-')[0]]: response,
            };
            localStorage.setItem(
              'tezsure',
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
  return (dispatch) => {
    if (!payload.userAccounts.hasOwnProperty(networkId)) {
      const { userAccounts } = payload;
      params.userAccounts[networkId.split('-')[0]] = userAccounts;
    }
    __getAccounts({ ...params }, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_BALANCE_ERR',
          payload: err,
        });
      }
      Promise.all(response).then((accounts) => {
        return dispatch({
          type: 'GET_ACCOUNTS',
          payload: accounts,
        });
      });
    });
  };
}

export function createFaucetAccountsAction(payload) {
  const { networkId } = payload.dashboardHeader;
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
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
        const __localStorage = JSON.parse(localStorage.getItem('tezsure'));
        __localStorage.userAccounts[networkId.split('-')[0]] = response;
        localStorage.setItem('tezsure', JSON.stringify({ ...__localStorage }));
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
  const __localStorage = JSON.parse(localStorage.getItem('tezsure'));
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
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
            'tezsure',
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
