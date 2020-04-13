export function selectedContractsTab(initialState = 'deployContract', action) {
  switch (action.type) {
    case 'CONTRACTS_TAB_TOGGLE':
      return action.payload;
    default:
      return initialState;
  }
}

export function selectedContractAmountBalance(initialState = '0', action) {
  switch (action.type) {
    case 'GET_CONTRACT_AMOUNT':
      return action.payload;
    default:
      return initialState;
  }
}

export function selectedContractStorage(initialState = '', action) {
  switch (action.type) {
    case 'DEPLOY_CONTRACT_STORAGE':
      return action.payload;
    default:
      return initialState;
  }
}
