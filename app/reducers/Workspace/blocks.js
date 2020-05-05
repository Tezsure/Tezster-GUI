export function blocks(initialState = [], action) {
  switch (action.type) {
    case 'GET_BLOCKS':
      return action.payload;
    case 'GET_BLOCKS_ERR':
      return action.payload;
    default:
      return initialState;
  }
}

export function blockSearch(initialState = [], action) {
  switch (action.type) {
    case 'GET_BLOCKS_SEARCH':
      return action.payload;
    case 'GET_BLOCKS_ERR':
      return action.payload;
    default:
      return initialState;
  }
}
