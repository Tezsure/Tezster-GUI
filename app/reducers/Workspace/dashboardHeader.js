const state = {
  chainId: '00',
  currentBlock: '00',
  gasLimit: '00',
  gasPrice: '00',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731'
};

export default function dashboardHeader(initialState = state, action) {
  switch (action.type) {
    case 'GET_DASHBOARD_HEADER':
      return action.payload;
    case 'GET_DASHBOARD_HEADER_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
