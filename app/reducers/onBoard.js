export function isAvailableLocalnodes(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_NODES_ERR':
      return action.payload;
    case 'TEZSTER_NODES_SUCCESS':
      return action.payload;
    case 'TEZSTER_NODES_PENDING_STATUS':
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
