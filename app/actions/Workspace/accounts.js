/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';

const {
  __getBalance,
  __getAccounts,
  __activateAccount,
  __activateAccountOperation
} = require('../../apis/eztz.service');

const config = require('../../apis/config');

export function toggleAccountsModalAction(modalType) {
  return {
    type: 'TOGGLE_ACCOUNTS_MODAL',
    payload: modalType
  };
}

export function getAccountsAction({ ...params }) {
  return dispatch => {
    if (
      localStorage.hasOwnProperty('tezsure') &&
      params.dashboardHeader.networkId === 'Localnode'
    ) {
      dispatch({
        type: 'GET_ACCOUNTS',
        payload: JSON.parse(localStorage.getItem('tezsure')).userAccounts
      });
    } else {
      __getAccounts({ ...params }, (err, accounts) => {
        if (err) {
          dispatch({
            type: 'GET_ACCOUNTS_ERR',
            payload: err
          });
        }
        Promise.all(accounts)
          .then(response => {
            if (!localStorage.hasOwnProperty('tezsure')) {
              localStorage.setItem(
                'tezsure',
                JSON.stringify({ userAccounts: response, ...config })
              );
            }
            dispatch({
              type: 'GET_ACCOUNTS',
              payload: response
            });
          })
          .catch(accountsErr => {
            dispatch({
              type: 'GET_ACCOUNTS_ERR',
              payload: accountsErr
            });
          });
      });
    }
  };
}

export function getBalanceAction(payload) {
  return dispatch => {
    if (
      localStorage.getItem('tezsure') &&
      payload.dashboardHeader.networkId === 'Localnode'
    ) {
      dispatch({
        type: 'GET_BALANCE',
        payload: localStorage.getItem('tezsure').userAccounts
      });
    } else {
      __getBalance({ ...payload }, (err, response) => {
        if (err) {
          dispatch({
            type: 'GET_BALANCE_ERR',
            payload: err
          });
        }
        dispatch({
          type: 'GET_BALANCE',
          payload: response
        });
      });
    }
  };
}

export function createAccountsAction(payload) {
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
  return dispatch => {
    __activateAccountOperation(payload, (err, result) => {
      if (err) {
        swal('Error!', err, 'error');
        return dispatch({
          type: 'GET_ACCOUNTS',
          payload: userAccounts
        });
      }
      const activatedAccount = {
        sk: result.privateKey,
        pk: result.publicKey,
        pkh: payload.faucet.pkh,
        label: `bootstrap${userAccounts.length + 1}`,
        dashboardHeader: payload.dashboardHeader
      };
      payload.userAccounts.push({ ...activatedAccount });
      Promise.all(
        payload.userAccounts.map(async elem => await __getBalance({ ...elem }))
      ).then(response => {
        const __localStorage = JSON.parse(localStorage.getItem('tezsure'));
        __localStorage.userAccounts = response;
        localStorage.setItem('tezsure', JSON.stringify({ ...__localStorage }));
        swal('Success!', 'Account created successfully', 'success');
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: response
        });
        dispatch({
          type: 'TOGGLE_ACCOUNTS_MODAL',
          payload: ''
        });
      });
    });
  };
}

export function restoreAccountAction(payload) {
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
  return dispatch => {
    __activateAccount(payload, (err, account) => {
      if (err) {
        dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err
        });
      }
      Promise.all([__getBalance({ ...account, ...payload })]).then(response => {
        userAccounts.push(response[0]);
        localStorage.setItem('tezsure', JSON.stringify({ userAccounts }));
        swal('Success!', 'Account registered successfully', 'success');
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: userAccounts
        });
        dispatch({
          type: 'TOGGLE_ACCOUNTS_MODAL',
          payload: ''
        });
      });
    });
  };
}
