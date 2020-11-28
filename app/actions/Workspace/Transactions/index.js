/* eslint-disable prettier/prettier */
/* eslint-disable no-prototype-builtins */

import swal from 'sweetalert';

const config = require('../../../db-config/helper.dbConfig');

const LOCAL_STORAGE_NAME = config.GetLocalStorage().storageName;

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
        case 'Delphinet':
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
        case 'Mainnet':
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
    const LocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    const Transactions = LocalStorage.transactions;
    const storeTransaction = (status) => {
      switch (true) {
        case networkName === 'Localnode' &&
          !Transactions.hasOwnProperty(networkName):
          Transactions.Localnode = [];
          Transactions.Localnode[args.senderAccount] = [];
          Transactions.Localnode[args.recieverAccount] = [];
          LocalStorage.transactions[networkName][args.senderAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          LocalStorage.transactions[networkName][args.recieverAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify(LocalStorage)
          );
          break;
        case networkName === 'Localnode' &&
          Transactions[networkName].hasOwnProperty(args.senderAccount):
          LocalStorage.transactions[networkName][args.senderAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          if (!Transactions.Localnode.hasOwnProperty(args.recieverAccount)) {
            Transactions.Localnode[args.recieverAccount] = [];
          }
          LocalStorage.transactions[networkName][args.recieverAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify(LocalStorage)
          );
          break;
        case networkName === 'Localnode' &&
          !Transactions[networkName].hasOwnProperty(args.senderAccount):
          if (!Transactions.Localnode.hasOwnProperty(args.recieverAccount)) {
            Transactions.Localnode[args.recieverAccount] = [];
          }
          LocalStorage.transactions[networkName] = {
            ...LocalStorage.transactions[networkName],
            [args.senderAccount]: [],
          };
          LocalStorage.transactions[networkName][args.senderAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          LocalStorage.transactions[networkName][args.recieverAccount].push({
            op: {
              opHash: 'N/A',
            },
            tx: {
              source: args.senderAccount,
              destination: args.recieverAccount,
              amount: parseInt(args.amount, 10) * 1000000,
              operationResultStatus: status,
              timestamp: new Date(),
            },
          });
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify(LocalStorage)
          );
          break;
        default:
          break;
      }
    };
    TransferBalanceTransactionAPI(args, (error, response) => {
      if (error) {
        swal(
          'Error!',
          'Failed to execute transactions for this account',
          'error'
        );
        storeTransaction('failed');
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
      storeTransaction('applied');
      swal(
        'Success!',
        `Transfer sucessfull with fee: ${response.fee} muꜩ`,
        'success'
      );
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
