/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';
import HandleAccountErrorsHelper from './error.accounts';

const {
  GetBalanceAPI,
  GetAccountsAPI,
  ActivateAccountsAPI,
  CreateFundraiserAccountAPI,
} = require('./api.accounts');

const config = require('../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = config.storageName;

function reducedLocalNodesAccounts(args) {
  const userAccounts = {};
  userAccounts.Localnode = config.identities;
  args.forEach((account) => {
    const LocalnodeAccounts = config.identities.filter(
      (elem) => account.label === elem.label
    );
    if (LocalnodeAccounts.length === 0) {
      userAccounts.Localnode.push(account);
    }
  });
  return userAccounts.Localnode;
}
export function getAccountsAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  const payload = { ...args, ...LocalStorage };
  payload.dashboardHeader = args.dashboardHeader;
  let userAccounts =
    LocalStorage === null ? args : LocalStorage.userAccounts[networkName];
  return (dispatch) => {
    switch (true) {
      case !args.isAvailableLocalnodes && networkName === 'Localnode':
        return dispatch({
          type: 'GET_ACCOUNTS',
          payload: [],
        });
      case LocalStorage === null &&
        args.userAccounts.length === 0 &&
        networkName === 'Localnode':
        payload.userAccounts.Localnode = config.identities;
        payload.userAccounts.Carthagenet = [];
        break;
      case args.isAvailableLocalnodes && userAccounts.length === 0:
        if (localStorage.hasOwnProperty(LOCAL_STORAGE_NAME)) {
          payload.userAccounts[networkName] =
            LocalStorage.userAccounts[networkName];
        } else if (
          networkName === 'Localnode' &&
          !localStorage.hasOwnProperty(LOCAL_STORAGE_NAME)
        ) {
          payload.userAccounts.Localnode = config.identities;
        }
        break;
      case args.isAvailableLocalnodes && userAccounts.length > 0:
        if (networkName === 'Localnode') {
          payload.userAccounts.Localnode = reducedLocalNodesAccounts(
            userAccounts
          );
        } else if (networkName !== 'Localnode' && navigator.onLine) {
          payload.userAccounts[networkName] =
            LocalStorage.userAccounts[networkName];
        } else if (networkName !== 'Localnode' && !navigator.onLine) {
          return dispatch({
            type: 'GET_ACCOUNTS',
            payload: LocalStorage.userAccounts.Carthagenet,
          });
        }
        break;
      case networkName !== 'Localnode' &&
        userAccounts.length > 0 &&
        navigator.onLine:
        if (
          localStorage.hasOwnProperty(LOCAL_STORAGE_NAME) &&
          LocalStorage.userAccounts[networkName].length > 0
        ) {
          payload.userAccounts[networkName] =
            LocalStorage.userAccounts[networkName];
        } else {
          payload.userAccounts[networkName] = userAccounts;
        }
        break;
      case networkName !== 'Localnode' &&
        navigator.onLine === false &&
        localStorage.hasOwnProperty(LOCAL_STORAGE_NAME) &&
        LocalStorage.userAccounts.Carthagenet.length > 0:
        return dispatch({
          type: 'GET_ACCOUNTS',
          payload: LocalStorage.userAccounts.Carthagenet,
        });
      default:
        payload.userAccounts[networkName] = [];
        break;
    }
    GetAccountsAPI(payload, (err, accounts) => {
      if (err) {
        return dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err,
        });
      }
      Promise.all(accounts)
        .then((response) => {
          if (
            response.length > 0 &&
            response[0].hasOwnProperty('label') &&
            response[0].toString() !==
              'Error: connect ECONNREFUSED 127.0.0.1:18731'
          ) {
            if (!localStorage.hasOwnProperty(LOCAL_STORAGE_NAME)) {
              userAccounts = {
                Carthagenet: [],
                Localnode: [],
              };
              userAccounts[networkName] = response;
              const LocalStorageData = JSON.stringify({
                ...config,
                userAccounts,
              });
              localStorage.setItem(LOCAL_STORAGE_NAME, LocalStorageData);
            }
            dispatch({
              type: 'TEZSTER_SHOW_STOP_NODES',
              payload: true,
            });
            return dispatch({
              type: 'GET_ACCOUNTS',
              payload: response,
            });
          }
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'GET_ACCOUNTS',
            payload: [],
          });
        })
        .catch((accountsErr) => {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'GET_ACCOUNTS_ERR',
            payload: accountsErr,
          });
        });
    });
  };
}
export function getBalanceAction(args) {
  return (dispatch) => dispatch(getAccountsAction(args));
}
export function createFaucetAccountsAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  let { userAccounts } = LocalStorage;
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    ActivateAccountsAPI(args, (error, result) => {
      if (error) {
        switch (error) {
          case networkName === 'Localnode':
            swal(
              'Error!',
              `Faucet account can't be activated on localnode`,
              'error'
            );
            break;
          case networkName !== 'Localnode':
            swal(
              'Error!',
              `Faucet account already activated \n go for restoring the account`,
              'error'
            );
            break;
          default:
            swal(
              'Error!',
              HandleAccountErrorsHelper(error.toString()),
              'error'
            );
            break;
        }
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: userAccounts[networkName],
        });
        return dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
      }
      const activatedAccount = {
        sk: result.privateKey,
        pk: result.publicKey,
        pkh: args.faucet.pkh,
        label: args.faucet.label,
        dashboardHeader: args.dashboardHeader,
      };
      userAccounts = args.userAccounts;
      userAccounts.push({ ...activatedAccount });

      const ACCOUNTS = userAccounts.map((elem) =>
        GetBalanceAPI({ ...elem, ...args })
      );
      Promise.all(ACCOUNTS)
        .then((response) => {
          LocalStorage.userAccounts[networkName] = response;
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify({ ...LocalStorage })
          );
          swal('Success!', 'Account created successfully', 'success');
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: response,
          });
          return dispatch({
            type: 'TOGGLE_ACCOUNTS_MODAL',
            payload: '',
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: args.userAccounts,
          });
          return dispatch({
            type: 'TOGGLE_ACCOUNTS_MODAL',
            payload: '',
          });
        });
    });
  };
}
export function restoreFaucetAccountAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
  const { userAccounts } = LocalStorage;
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    CreateFundraiserAccountAPI(args, (err, account) => {
      if (err) {
        dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err,
        });
        return dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
      }
      Promise.all([GetBalanceAPI({ ...account, ...args })])
        .then((response) => {
          const restoredAccount = { ...response[0] };
          const LocalConfig = { ...LocalStorage, ...args };
          const msg = args.hasOwnProperty('msg')
            ? args.msg
            : 'Account restored successfully';

          restoredAccount.label = args.label;
          restoredAccount.secret = account.secretKey;
          restoredAccount.sk = account.secretKey;
          userAccounts[networkName] = args.userAccounts;
          userAccounts[networkName].push(restoredAccount);
          LocalConfig.userAccounts = userAccounts;
          localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(LocalConfig));

          swal('Success!', msg, 'success');
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: userAccounts[networkName],
          });
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          return dispatch({
            type: 'TOGGLE_ACCOUNTS_MODAL',
            payload: '',
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: args.userAccounts,
          });
          return dispatch({
            type: 'TOGGLE_ACCOUNTS_MODAL',
            payload: '',
          });
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
export function toggleAccountsModalAction(MODAL_STATE) {
  return {
    type: 'TOGGLE_ACCOUNTS_MODAL',
    payload: MODAL_STATE,
  };
}
export function deleteAccountAction(args) {
  return (dispatch) => {
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    LocalStorage.userAccounts[networkName] = args.userAccounts.filter(
      (elem) => elem.pkh !== args.pkh
    );
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(LocalStorage));
    swal('Success!', 'Account deleted sucessfully', 'success');
    return dispatch({
      type: 'GET_ACCOUNTS',
      payload: LocalStorage.userAccounts[networkName],
    });
  };
}
