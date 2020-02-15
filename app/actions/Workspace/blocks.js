const { __getBlockHeads } = require('../../apis/eztz.service');

export default function getBlockHeadsActions(payload) {
  debugger;

  return dispatch => {
    __getBlockHeads(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_BLOCKS_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'GET_BALANCE',
        payload: response
      });
    });
  };
}
