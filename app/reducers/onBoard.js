export function isAvailableTezsterCli(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_CLI_ERR':
      return action.payload;
    case 'TEZSTER_CLI_SUCCESS':
      return action.payload;
    case 'TEZSTER_CLI_PENDING':
      return 'pending';
    default:
      return initialState;
  }
}
export function localConfig(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_LOCAL_CONFIG':
      return action.payload;
    default:
      return initialState;
  }
}
