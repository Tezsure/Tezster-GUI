export default function selectedContractsTab(
  initialState = 'deployContract',
  action
) {
  switch (action.type) {
    case 'CONTRACTS_TAB_TOGGLE':
      return action.payload;
    default:
      return initialState;
  }
}
