const { getBlockHeads } = require('../app.service.js');

let headerData = {
  chainId: '',
  currentBlock: '',
  gasLimit: '',
  gasPrice: '',
  networkId: 'babylonnet',
  rpcServer: 'http://localhost:18731'
};

export default function getDashboardHeaderAction(payload) {
  return dispatch => {
    getBlockHeads(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_DASHBOARD_HEADER_ERR',
          payload: err
        });
      }
      headerData = {
        ...headerData,
        chainId: response.chain_id,
        currentBlock: '00',
        gasLimit: '00',
        gasPrice: '00'
      };
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: headerData
      });
    });
  };
}
