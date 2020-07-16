export default function handleEditorCodeOnChange(michelsonCode) {
  return {
    type: 'EDITOR_CODE',
    payload: michelsonCode,
  };
}
