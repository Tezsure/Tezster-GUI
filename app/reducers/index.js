/* eslint-disable import/named */
// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import { blocks, blockSearch, searchText } from './Workspace/blocks';
import editorMichelsonCode from './Workspace/editor';
import {
  sidebarToggleState,
  currentTab,
  blockAccordionIndex,
} from './Workspace/sidebar';
import {
  buttonState,
  userAccounts,
  userBalances,
  showAccountsModal,
} from './Workspace/accounts';
import dashboardHeader from './Workspace/dashboardHeader';
import {
  userTransactions,
  showTransactionModal,
  selectedTransactionWallet,
  transactionsSuccess,
} from './Workspace/transactions';

import {
  selectedContractsTab,
  selectedContractStorage,
  selectedContractAmountBalance,
} from './Workspace/contracts';

import {
  tezsterError,
  tezsterImageDownload,
  tezsterSetup,
  tezsterStartNodes,
  tezsterShowStopNodes,
  tezsterLoaderStatus,
} from './Tezster';

import {
  isAvailableLocalnodes,
  showMainDashboard,
  localConfig,
} from './onBoard';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    blocks,
    blockSearch,
    searchText,
    buttonState,
    sidebarToggleState,
    showAccountsModal,
    showTransactionModal,
    blockAccordionIndex,
    selectedContractsTab,
    selectedContractStorage,
    selectedContractAmountBalance,
    dashboardHeader,
    userAccounts,
    userBalances,
    userTransactions,
    transactionsSuccess,
    selectedTransactionWallet,
    showMainDashboard,
    isAvailableLocalnodes,
    localConfig,
    currentTab,
    editorMichelsonCode,
    tezsterError,
    tezsterImageDownload,
    tezsterSetup,
    tezsterStartNodes,
    tezsterShowStopNodes,
    tezsterLoaderStatus,
  });
}
