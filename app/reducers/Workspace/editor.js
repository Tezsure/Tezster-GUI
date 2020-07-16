export default function editorMichelsonCode(initialState = '', action) {
  switch (action.type) {
    case 'EDITOR_CODE':
      return action.payload;
    default:
      return initialState;
  }
}
