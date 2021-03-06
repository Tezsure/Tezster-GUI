/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workspace from '../components/Workspace';
import handleEditorCodeOnChange from '../actions/Workspace/Editor';
import {
  sidebarToggleAction,
  handleAccordionAction,
  handleTabChangeAction,
} from '../actions/Workspace/Sidebar';
import installLocalnodesAction from '../actions/Tezster-nodes';
import stopTezsterNodesAction from '../actions/Tezster-nodes/stop-nodes-setup';

import {
  getBlockHeadsAction,
  searchBlockHead,
  resetSearchText,
  searchBlocksAction,
} from '../actions/Workspace/Blocks';

import {
  toggleButtonState,
  getAccountsAction,
  createFaucetAccountsAction,
  restoreFaucetAccountAction,
  toggleAccountsModalAction,
  getBalanceAction,
  deleteAccountAction,
} from '../actions/Workspace/Accounts';
import {
  toggleTransactionModalAction,
  executeTransactionAction,
  getTransactionsAction,
  selectTransactionWalletAction,
} from '../actions/Workspace/Transactions';
import {
  handleContractsTabChangeAction,
  handleInvokeContractAction,
  deployContractAction,
  getContractStorageAction,
  getAccountBalanceAction,
  handleAddContractAction,
  deleteContractAction,
} from '../actions/Workspace/Contracts';
import {
  getDashboardHeaderAction,
  handleNetworkChangeAction,
} from '../actions/Workspace/DashboardHeader';
import {
  handleLocalnodesActionChange,
  checkLocalnodesAction,
  getLocalConfigAction,
} from '../actions/Onboard';
import Error from '../components/Error';

class WorkspacePage extends Component {
  componentDidMount() {
    this.props.checkLocalnodesAction();
    this.props.getLocalConfigAction();
    this.props.getBlockHeadsAction({ ...this.props });
    this.props.handleContractsTabChangeAction('listAccounts');
  }

  render() {
    const { showMainDashboard } = this.props;
    if (showMainDashboard && showMainDashboard !== 'pending') {
      return <Workspace {...this.props} />;
    }
    return <Error {...this.props} />;
  }
}
const mapDispatchToProps = (dispatch) => ({
  toggleButtonState: (payload) => dispatch(toggleButtonState(payload)),
  restoreFaucetAccountAction: (payload) =>
    dispatch(restoreFaucetAccountAction(payload)),
  handleNetworkChangeAction: (payload) =>
    dispatch(handleNetworkChangeAction(payload)),
  toggleTransactionModalAction: (payload) =>
    dispatch(toggleTransactionModalAction(payload)),
  getBalanceAction: (payload) => dispatch(getBalanceAction(payload)),
  getAccountsAction: (payload) => dispatch(getAccountsAction(payload)),
  getBlockHeadsAction: (payload) => dispatch(getBlockHeadsAction(payload)),
  searchBlocksAction: (payload) => dispatch(searchBlocksAction(payload)),
  searchBlockHead: (payload) => dispatch(searchBlockHead(payload)),
  resetSearchText: (payload) => dispatch(resetSearchText(payload)),
  getTransactionsAction: (payload) => dispatch(getTransactionsAction(payload)),
  handleInvokeContractAction: (payload) =>
    dispatch(handleInvokeContractAction(payload)),
  deployContractAction: (payload) => dispatch(deployContractAction(payload)),
  getAccountBalanceAction: (payload) =>
    dispatch(getAccountBalanceAction(payload)),
  deleteContractAction: (payload) => dispatch(deleteContractAction(payload)),
  deleteAccountAction: (payload) => dispatch(deleteAccountAction(payload)),
  createFaucetAccountsAction: (payload) =>
    dispatch(createFaucetAccountsAction(payload)),
  toggleAccountsModalAction: (payload) =>
    dispatch(toggleAccountsModalAction(payload)),
  getDashboardHeaderAction: (payload) =>
    dispatch(getDashboardHeaderAction(payload)),
  sidebarToggleAction: (payload) => dispatch(sidebarToggleAction(payload)),
  selectTransactionWalletAction: (payload) =>
    dispatch(selectTransactionWalletAction(payload)),
  handleTabChangeAction: (payload) => dispatch(handleTabChangeAction(payload)),
  executeTransactionAction: (payload) =>
    dispatch(executeTransactionAction(payload)),
  handleContractsTabChangeAction: (payload) =>
    dispatch(handleContractsTabChangeAction(payload)),
  getContractStorageAction: (payload) =>
    dispatch(getContractStorageAction(payload)),
  handleLocalnodesActionChange: (payload) =>
    dispatch(handleLocalnodesActionChange(payload)),
  checkLocalnodesAction: (payload) => dispatch(checkLocalnodesAction(payload)),
  getLocalConfigAction: (payload) => dispatch(getLocalConfigAction(payload)),
  handleAccordionAction: (payload) => dispatch(handleAccordionAction(payload)),
  handleAddContractAction: (payload) =>
    dispatch(handleAddContractAction(payload)),
  handleEditorCodeOnChange: (payload) =>
    dispatch(handleEditorCodeOnChange(payload)),
  installLocalnodesAction: (payload) =>
    dispatch(installLocalnodesAction(payload)),
  stopTezsterNodesAction: (payload) =>
    dispatch(stopTezsterNodesAction(payload)),
});
const mapStateToProps = (state) => ({
  blocks: state.blocks,
  blockSearch: state.blockSearch,
  currentTab: state.currentTab,
  buttonState: state.buttonState,
  userAccounts: state.userAccounts,
  showTransactionModal: state.showTransactionModal,
  showAccountsModal: state.showAccountsModal,
  dashboardHeader: state.dashboardHeader,
  userBalances: state.userBalances,
  sidebarToggleState: state.sidebarToggleState,
  searchText: state.searchText,
  blockAccordionIndex: state.blockAccordionIndex,
  userTransactions: state.userTransactions,
  selectedTransactionWallet: state.selectedTransactionWallet,
  transactionsSuccess: state.transactionsSuccess,
  localConfig: state.localConfig,
  selectedContractsTab: state.selectedContractsTab,
  selectedContractStorage: state.selectedContractStorage,
  selectedContractAmountBalance: state.selectedContractAmountBalance,
  isAvailableLocalnodes: state.isAvailableLocalnodes,
  showMainDashboard: state.showMainDashboard,
  editorMichelsonCode: state.editorMichelsonCode,
  tezsterError: state.tezsterError,
  tezsterSetup: state.tezsterSetup,
  tezsterShowStopNodes: state.tezsterShowStopNodes,
  tezsterStartNodes: state.tezsterStartNodes,
  tezsterImageDownload: state.tezsterImageDownload,
  tezsterLoaderStatus: state.tezsterLoaderStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePage);
