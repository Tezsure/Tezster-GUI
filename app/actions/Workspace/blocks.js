const { getBlockHeads } = require('../app.service.js');

export default function getBlockHeadsActions(payload) {
  return dispatch =>
    getBlockHeads(payload, (err, response) => {
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
}
