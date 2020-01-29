export function sidebarToggleAction(isSidebarCollapsed) {
  return {
    type: 'SIDEBAR_TOGGLE',
    payload: !isSidebarCollapsed
  };
}
export function handleTabChangeAction(tabName) {
  return {
    type: 'TAB_CHANGE',
    payload: tabName
  };
}
export function handleAccordionAction(BlockIndex) {
  return {
    type: 'BLOCK_TOGGLE',
    payload: BlockIndex
  };
}
