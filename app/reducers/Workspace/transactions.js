export function userTransactions(initialState = [], action) {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return action.payload;
    case 'GET_TRANSACTIONS_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
export function selectedWallet(initialState = '0', action) {
  switch (action.type) {
    case 'SELECT_TRANSACTION_ACCOUNT':
      return action.payload;
    case 'SELECT_TRANSACTION_ACCOUNT_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
export function transactionsSuccess(initialState = [], action) {
  switch (action.type) {
    case 'EXECUTE_TRANSACTIONS_SUCCESS':
      return action.payload;
    case 'EXECUTE_TRANSACTIONS_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
