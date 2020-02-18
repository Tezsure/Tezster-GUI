export function showAccountsModal(initialState = '', action) {
  switch (action.type) {
    case 'TOGGLE_ACCOUNTS_MODAL':
      return action.payload;
    default:
      return initialState;
  }
}

export function userAccounts(initialState = [], action) {
  switch (action.type) {
    case 'GET_ACCOUNTS':
      return action.payload;
    case 'GET_ACCOUNTS_ERR':
      return action.payload;
    default:
      return initialState;
  }
}

export function userBalances(initialState = [], action) {
  switch (action.type) {
    case 'GET_BALANCE':
      return action.payload;
    case 'GET_BALANCE_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
