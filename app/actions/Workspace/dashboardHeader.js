const { __getBlockHeads } = require('../../apis/eztz.service');

let LocalNodeHeaderData = {
  chainId: '',
  currentBlock: '00',
  gasLimit: '00',
  gasPrice: '00',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731'
};

let BabylonnetHeaderData = {
  chainId: '',
  currentBlock: '00',
  gasLimit: '00',
  gasPrice: '00',
  networkId: 'Babylonnet',
  rpcServer: 'https://tezos-dev.cryptonomic-infra.tech'
};

let headerData = {
  chainId: '',
  currentBlock: '00',
  gasLimit: '00',
  gasPrice: '00',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731'
};

export function getDashboardHeaderAction(payload) {
  return dispatch => {
    __getBlockHeads({ ...payload }, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_DASHBOARD_HEADER_ERR',
          payload: err
        });
      }
      headerData = {
        ...headerData,
        protocol: response.protocol,
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
export function handleNetworkChangeAction(params) {
  return dispatch => {
    __getBlockHeads(params, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_DASHBOARD_HEADER_ERR',
          payload: err
        });
      }
      if (params.env === 'Localnode') {
        LocalNodeHeaderData = {
          ...LocalNodeHeaderData,
          protocol: response.protocol,
          chainId: response.chain_id,
          currentBlock: '00',
          gasLimit: '00',
          gasPrice: '00'
        };
        dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: LocalNodeHeaderData
        });
      } else {
        BabylonnetHeaderData = {
          ...BabylonnetHeaderData,
          protocol: response.protocol,
          chainId: response.chain_id,
          currentBlock: '00',
          gasLimit: '00',
          gasPrice: '00'
        };
        dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: BabylonnetHeaderData
        });
      }
    });
  };
}
