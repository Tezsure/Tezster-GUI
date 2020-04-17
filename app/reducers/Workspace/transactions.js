import swal from 'sweetalert';

export function showTransactionModal(initialState = false, action) {
  switch (action.type) {
    case 'TOGGLE_TRANSACTION_MODAL':
      return action.payload;
    default:
      return initialState;
  }
}

export function userTransactions(initialState = [], action) {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return action.payload;
    default:
      return initialState;
  }
}
export function selectedTransactionWallet(initialState = '0', action) {
  switch (action.type) {
    case 'SELECT_TRANSACTION_ACCOUNT':
      return action.payload;
    default:
      return initialState;
  }
}
export function transactionsSuccess(initialState = [], action) {
  switch (action.type) {
    case 'EXECUTE_TRANSACTIONS_SUCCESS':
      return action.payload;
    default:
      return initialState;
  }
}
