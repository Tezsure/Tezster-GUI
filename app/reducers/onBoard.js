export default function isAvailableTezsterCli(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_CLI_ERR':
      return action.payload;
    case 'TEZSTER_CLI_SUCCESS':
      return action.payload;
    default:
      return initialState;
  }
}
