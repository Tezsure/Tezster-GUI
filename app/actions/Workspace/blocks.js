const { getBlockHeight, getBlockData } = require('../../apis/tzstats.service');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731'
};

export default function getBlockHeadsActions(args) {
  return dispatch => {
    if (args.dashboardHeader.networkId === 'Localnode') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData
      });
      dispatch({
        type: 'GET_BLOCKS',
        payload: localnodeData
      });
    } else {
      getBlockHeight(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
            type: 'GET_BLOCKS_ERR',
            payload: blockHeightError
          });
        }
        getBlockData(
          { blockId: blockHeightResponse.height, ...args },
          (blockDataError, blockDataResponse) => {
            if (blockDataError) {
              dispatch({
                type: 'GET_BLOCKS_ERR',
                payload: blockDataError
              });
            }
            dispatch({
              type: 'GET_BLOCKS',
              payload: {
                ...blockDataResponse,
                ...blockHeightResponse
              }
            });
          }
        );
      });
    }
  };
}
