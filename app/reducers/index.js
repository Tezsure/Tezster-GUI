// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import counter from './counter';
import {
  sidebarToggleState,
  currentTab,
  blockAccordionIndex
} from './Workspace/sidebar';
import { userAccounts, userBalances } from './Workspace/accounts';
import dashboardHeader from './Workspace/dashboardHeader';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter,
    sidebarToggleState,
    blockAccordionIndex,
    dashboardHeader,
    userAccounts,
    userBalances,
    currentTab
  });
}
