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
import {
  userAccounts,
  userBalances,
  showAccountsModal
} from './Workspace/accounts';
import dashboardHeader from './Workspace/dashboardHeader';
import {
  userTransactions,
  showTransactionModal,
  selectedTransactionWallet,
  transactionsSuccess
} from './Workspace/transactions';

import selectedContractsTab from './Workspace/contracts';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter,
    sidebarToggleState,
    showAccountsModal,
    showTransactionModal,
    blockAccordionIndex,
    selectedContractsTab,
    dashboardHeader,
    userAccounts,
    userBalances,
    userTransactions,
    transactionsSuccess,
    selectedTransactionWallet,
    currentTab
  });
}
