/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';

const {
  __sendOperation,
  __listAccountTransactions,
} = require('../../apis/eztz.service');

const config = require('../../apis/config');
const LOCAL_STORAGE_NAME = config.storageName;

export function toggleTransactionModalAction(modalState) {
  return {
    type: 'TOGGLE_TRANSACTION_MODAL',
    payload: modalState,
  };
}

export function selectTransactionWalletAction(payload) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_TRANSACTION_ACCOUNT',
      payload: payload.accountId,
    });
    dispatch(getTransactionsAction(payload));
  };
}

export function getTransactionsAction({ ...params }) {
  const networkId = params.dashboardHeader.networkId.split('-')[0];
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    if (params.hasOwnProperty('accountId')) {
      if (networkId === 'Localnode') {
        if (localStorage.getItem(LOCAL_STORAGE_NAME)) {
          const { transactions } = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_NAME)
          );
          if (
            transactions[networkId].length === 0 &&
            transactions[networkId].hasOwnProperty(params.accountId)
          ) {
            dispatch({
              type: 'BUTTON_LOADING_STATE',
              payload: false,
            });
            dispatch({
              type: 'GET_TRANSACTIONS',
              payload: [],
            });
          } else {
            dispatch({
              type: 'BUTTON_LOADING_STATE',
              payload: false,
            });
            dispatch({
              type: 'GET_TRANSACTIONS',
              payload: transactions[networkId].hasOwnProperty(params.accountId)
                ? transactions[networkId][params.accountId]
                : [],
            });
          }
        } else {
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: [],
          });
        }
      } else {
        __listAccountTransactions({ ...params }, (err, response) => {
          if (err) {
            swal(
              'Error!',
              'Couldnot fetch transactions for this account',
              'error'
            );
            dispatch({
              type: 'BUTTON_LOADING_STATE',
              payload: false,
            });
            return dispatch({
              type: 'GET_TRANSACTIONS_ERR',
              payload: err,
            });
          }
          dispatch({
            type: 'BUTTON_LOADING_STATE',
            payload: false,
          });
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: response,
          });
        });
      }
    }
  };
}

export function executeTransactionAction(params) {
  const networkId = params.dashboardHeader.networkId.split('-')[0];
  return (dispatch) => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true,
    });
    if (networkId === 'Localnode') {
      const __localStorage = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_NAME)
      );
      if (
        !__localStorage.transactions[networkId].hasOwnProperty(
          params.senderAccount
        ) ||
        __localStorage.transactions[networkId][params.senderAccount].length ===
          0
      ) {
        __localStorage.transactions = {
          [networkId]: {
            [params.senderAccount]: [],
          },
        };
      }
      __localStorage.transactions[networkId][params.senderAccount].push({
        op: {
          opHash: 'N/A',
        },
        tx: {
          source: params.senderAccount,
          destination: params.recieverAccount,
          amount: params.amount,
          operationResultStatus: 'applied',
        },
      });
      localStorage.setItem(
        LOCAL_STORAGE_NAME,
        JSON.stringify({ ...__localStorage })
      );
    }
    __sendOperation({ ...params }, (err, response) => {
      if (err) {
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
        dispatch(getTransactionsAction({ ...params }));
        return dispatch({
          type: 'EXECUTE_TRANSACTIONS_ERR',
          payload: err,
        });
      }
      swal('Success!', 'Transaction executed successfully', 'success');
      dispatch({
        type: 'BUTTON_LOADING_STATE',
        payload: false,
      });
      dispatch(toggleTransactionModalAction(false));
      dispatch(getTransactionsAction({ ...params }));
      return dispatch({
        type: 'EXECUTE_TRANSACTIONS_SUCCESS',
        payload: response,
      });
    });
  };
}
