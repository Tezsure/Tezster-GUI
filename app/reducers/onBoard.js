export function isAvailableLocalnodes(initialState = false, action) {
  switch (action.type) {
    case 'LOCAL_NODE_RUNNING_STATUS':
      return action.payload;
    default:
      return initialState;
  }
}
export function showMainDashboard(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_SHOW_DASHBOARD':
      return action.payload;
    case 'TEZSTER_SHOW_DASHBOARD_PENDING':
      return 'pending';
    case 'TEZSTER_NODES_ERR':
      return true;
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
