/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
import swal from 'sweetalert';

const {
  __sendOperation,
  __listAccountTransactions
} = require('../../apis/eztz.service');

export function toggleTransactionModalAction(modalState) {
  return {
    type: 'TOGGLE_TRANSACTION_MODAL',
    payload: modalState
  };
}

export function selectTransactionWalletAction(payload) {
  return dispatch => {
    dispatch({
      type: 'SELECT_TRANSACTION_ACCOUNT',
      payload: payload.accountId
    });
    dispatch(getTransactionsAction(payload));
  };
}

export function getTransactionsAction({ ...params }) {
  return dispatch => {
    if (params.hasOwnProperty('accountId')) {
      if (params.dashboardHeader.networkId === 'Localnode') {
        if (localStorage.getItem('tezsure')) {
          const { transactions } = JSON.parse(localStorage.getItem('tezsure'));
          if (
            transactions.length === 0 &&
            transactions.hasOwnProperty(params.accountId)
          ) {
            dispatch({
              type: 'GET_TRANSACTIONS',
              payload: []
            });
          } else {
            dispatch({
              type: 'GET_TRANSACTIONS',
              payload: transactions.hasOwnProperty(params.accountId)
                ? transactions[params.accountId]
                : []
            });
          }
        } else {
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: []
          });
        }
      } else {
        __listAccountTransactions({ ...params }, (err, response) => {
          if (err) {
            dispatch({
              type: 'GET_TRANSACTIONS_ERR',
              payload: err
            });
          }
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: response
          });
        });
      }
    }
  };
}

export function executeTransactionAction(params) {
  return dispatch => {
    dispatch({
      type: 'BUTTON_LOADING_STATE',
      payload: true
    });
    if (params.dashboardHeader.networkId === 'Localnode') {
      const __localStorage = JSON.parse(localStorage.getItem('tezsure'));
      if (
        !__localStorage.transactions.hasOwnProperty(params.senderAccount) ||
        __localStorage.transactions[params.senderAccount].length === 0
      ) {
        __localStorage.transactions = {};
        __localStorage.transactions[params.senderAccount] = [];
      }
      __localStorage.transactions[params.senderAccount].push({
        op: {
          opHash: 'N/A'
        },
        tx: {
          source: params.senderAccount,
          destination: params.recieverAccount,
          amount: params.amount,
          operationResultStatus: 'applied'
        }
      });
      localStorage.setItem('tezsure', JSON.stringify({ ...__localStorage }));
      swal('Success!', 'Transaction executed successfully', 'success');
      dispatch({
        type: 'EXECUTE_TRANSACTIONS_SUCCESS',
        payload: __localStorage.transactions[params.senderAccount]
      });
    } else {
      __sendOperation({ ...params }, (err, response) => {
        if (err) {
          return dispatch({
            type: 'EXECUTE_TRANSACTIONS_ERR',
            payload: response
          });
        }
        swal('Success!', 'Transaction executed successfully', 'success');
        return dispatch({
          type: 'EXECUTE_TRANSACTIONS_SUCCESS',
          payload: response
        });
      });
    }
    dispatch(toggleTransactionModalAction(false));
    dispatch(getTransactionsAction({ ...params }));
  };
}
