export function tezsterError(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_ERROR':
      return action.payload;
    default:
      return initialState;
  }
}

export function tezsterImageDownload(initialState = {}, action) {
  switch (action.type) {
    case 'TEZSTER_IMAGE_DOWNLOAD':
      return action.payload;
    default:
      return initialState;
  }
}

export function tezsterSetup(initialState = {}, action) {
  switch (action.type) {
    case 'TEZSTER_CONTAINER_RUNNING':
      return action.payload;
    default:
      return initialState;
  }
}

export function tezsterStartNodes(initialState = {}, action) {
  switch (action.type) {
    case 'TEZSTER_START_NODES':
      return action.payload;
    case 'TEZSTER_STOP_NODES':
      return action.payload;
    default:
      return initialState;
  }
}

export function tezsterShowStopNodes(initialState = false, action) {
  switch (action.type) {
    case 'TEZSTER_SHOW_STOP_NODES':
      return action.payload;
    default:
      return initialState;
  }
}

export function tezsterLoaderStatus(initialState = { loader: false }, action) {
  switch (action.type) {
    case 'STARTING_NODES':
      return action.payload;
    default:
      return initialState;
  }
}
