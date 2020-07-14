export function sidebarToggleAction(IS_SIDEBAR_COLLAPSED) {
  return {
    type: 'SIDEBAR_TOGGLE',
    payload: !IS_SIDEBAR_COLLAPSED,
  };
}
export function handleTabChangeAction(TAB_NAME) {
  return {
    type: 'TAB_CHANGE',
    payload: TAB_NAME,
  };
}
export function handleAccordionAction(BLOCK_INDEX) {
  return {
    type: 'BLOCK_TOGGLE',
    payload: BLOCK_INDEX,
  };
}
