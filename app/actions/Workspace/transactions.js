import swal from 'sweetalert';

const {
  __getBalance,
  __getAccounts,
  __sendOperation,
  __activateAccount,
  __generateMnemonic,
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
  };
}

export function executeTransactionAction(params) {
  return dispatch => {
    __sendOperation({ ...params }, (err, response) => {
      if (err) {
        dispatch({
          type: 'EXECUTE_TRANSACTIONS_ERR',
          payload: response
        });
      }
      swal('Success!', 'Transaction executed successfully', 'success');
      dispatch({
        type: 'EXECUTE_TRANSACTIONS_SUCCESS',
        payload: response
      });
    });
  };
}
