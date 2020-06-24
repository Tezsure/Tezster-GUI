/* eslint-disable no-prototype-builtins */

import swal from 'sweetalert';

const config = require('../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = config.storageName;

const {
  ListAccountTransactionsAPI,
  TransferBalanceTransactionAPI,
} = require('./api.transactions');

export function toggleTransactionModalAction(MODAL_STATE) {
  return {
    type: 'TOGGLE_TRANSACTION_MODAL',
    payload: MODAL_STATE,
  };
}

export function selectTransactionWalletAction(args) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_TRANSACTION_ACCOUNT',
      payload: args.accountId,
    });
    dispatch(getTransactionsAction(args));
  };
}

export function getTransactionsAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    if (args.hasOwnProperty('accountId')) {
      const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
      let currentTransactions = [];
      switch (networkName) {
        case 'Localnode':
          currentTransactions = LocalStorage.transactions[networkName];
          if (
            currentTransactions.length === 0 &&
            currentTransactions.hasOwnProperty(args.accountId)
          ) {
            dispatch({
              type: 'BUTTON_LOADING_STATE',
              payload: false,
            });
            return dispatch({
              type: 'GET_TRANSACTIONS',
              payload: [],
            });
          }
          currentTransactions = LocalStorage.transactions[networkName];
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          return dispatch({
            type: 'GET_TRANSACTIONS',
            payload: currentTransactions.hasOwnProperty(args.accountId)
              ? currentTransactions[args.accountId]
              : [],
          });
        case 'Carthagenet':
          ListAccountTransactionsAPI(args, (error, response) => {
            if (error) {
              swal(
                'Error!',
                'Couldnot fetch transactions for the selected account',
                'error'
              );
              dispatch({
                type: 'BUTTON_LOADING_STATE',
                payload: false,
              });
              return dispatch({
                type: 'GET_TRANSACTIONS_ERR',
                payload: error,
              });
            }
            dispatch({
              type: 'BUTTON_LOADING_STATE',
              payload: false,
            });
            return dispatch({
              type: 'GET_TRANSACTIONS',
              payload: response,
            });
          });
          break;
        default:
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          return dispatch({
            type: 'GET_TRANSACTIONS',
            payload: [],
          });
      }
    }
  };
}

export function executeTransactionAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    if (networkName === 'Localnode') {
      const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
      let currentTransactions = [];
      currentTransactions = LocalStorage.transactions[networkName];
      if (
        !currentTransactions.hasOwnProperty(args.senderAccount) ||
        currentTransactions[networkName][args.senderAccount].length === 0
      ) {
        LocalStorage.transactions = {
          [networkName]: {
            [args.senderAccount]: [],
          },
        };
      }
      LocalStorage.transactions[networkName][args.senderAccount].push({
        op: {
          opHash: 'N/A',
        },
        tx: {
          source: args.senderAccount,
          destination: args.recieverAccount,
          amount: args.amount,
          operationResultStatus: 'applied',
        },
      });
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(LocalStorage));
    }
    TransferBalanceTransactionAPI(args, (error, response) => {
      if (error) {
        swal(
          'Error!',
          'Failed to execute transactions for this account',
          'error'
        );
        dispatch({
          type: 'BUTTON_LOADING_STATE',
          payload: false,
        });
        dispatch(toggleTransactionModalAction(false));
        dispatch(getTransactionsAction(args));
        return dispatch({
          type: 'EXECUTE_TRANSACTIONS_ERR',
          payload: error,
        });
      }
      swal('Success!', 'Transaction executed successfully', 'success');
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      dispatch(toggleTransactionModalAction(false));
      dispatch(getTransactionsAction(args));
      return dispatch({
        type: 'EXECUTE_TRANSACTIONS_SUCCESS',
        payload: response,
      });
    });
  };
}
