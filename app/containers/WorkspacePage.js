import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workspace from '../components/Workspace';
import {
  sidebarToggleAction,
  handleAccordionAction,
  handleTabChangeAction
} from '../actions/Workspace/sidebar';

import getBlockHeadsActions from '../actions/Workspace/blocks';

import {
  toggleButtonState,
  getAccountsAction,
  createAccountsAction,
  restoreAccountAction,
  toggleAccountsModalAction,
  getBalanceAction
} from '../actions/Workspace/accounts';
import {
  toggleTransactionModalAction,
  executeTransactionAction,
  getTransactionsAction,
  selectTransactionWalletAction
} from '../actions/Workspace/transactions';
import {
  handleContractsTabChangeAction,
  handleInvokeContractAction,
  deployContractAction,
  getContractStorageAction,
  getAccountBalanceAction
} from '../actions/Workspace/contracts';
import {
  getDashboardHeaderAction,
  handleNetworkChangeAction
} from '../actions/Workspace/dashboardHeader';
import {
  checkTezsterCliAction,
  getLocalConfigAction
} from '../actions/Onboard';
import Error from '../components/Error';

class WorkspacePage extends Component {
  componentDidMount() {
    this.props.checkTezsterCliAction();
    this.props.getLocalConfigAction();
    this.props.getBlockHeadsActions({ ...this.props });
  }

  render() {
    if (
      this.props.isAvailableTezsterCli &&
      this.props.isAvailableTezsterCli !== 'pending'
    ) {
      return <Workspace {...this.props} />;
    }
    return <Error {...this.props} />;
  }
}
const mapDispatchToProps = dispatch => ({
  toggleButtonState: payload => dispatch(toggleButtonState(payload)),
  restoreAccountAction: payload => dispatch(restoreAccountAction(payload)),
  handleNetworkChangeAction: payload =>
    dispatch(handleNetworkChangeAction(payload)),
  toggleTransactionModalAction: payload =>
    dispatch(toggleTransactionModalAction(payload)),
  getBalanceAction: payload => dispatch(getBalanceAction(payload)),
  getAccountsAction: payload => dispatch(getAccountsAction(payload)),
  getBlockHeadsActions: payload => dispatch(getBlockHeadsActions(payload)),
  getTransactionsAction: payload => dispatch(getTransactionsAction(payload)),
  handleInvokeContractAction: payload =>
    dispatch(handleInvokeContractAction(payload)),
  deployContractAction: payload => dispatch(deployContractAction(payload)),
  getAccountBalanceAction: payload =>
    dispatch(getAccountBalanceAction(payload)),
  createAccountsAction: payload => dispatch(createAccountsAction(payload)),
  toggleAccountsModalAction: payload =>
    dispatch(toggleAccountsModalAction(payload)),
  getDashboardHeaderAction: payload =>
    dispatch(getDashboardHeaderAction(payload)),
  sidebarToggleAction: payload => dispatch(sidebarToggleAction(payload)),
  selectTransactionWalletAction: payload =>
    dispatch(selectTransactionWalletAction(payload)),
  handleTabChangeAction: payload => dispatch(handleTabChangeAction(payload)),
  executeTransactionAction: payload =>
    dispatch(executeTransactionAction(payload)),
  handleContractsTabChangeAction: payload =>
    dispatch(handleContractsTabChangeAction(payload)),
  getContractStorageAction: payload =>
    dispatch(getContractStorageAction(payload)),
  checkTezsterCliAction: payload => dispatch(checkTezsterCliAction(payload)),
  getLocalConfigAction: payload => dispatch(getLocalConfigAction(payload)),
  handleAccordionAction: payload => dispatch(handleAccordionAction(payload))
});
const mapStateToProps = state => ({
  blocks: state.blocks,
  currentTab: state.currentTab,
  buttonState: state.buttonState,
  userAccounts: state.userAccounts,
  showTransactionModal: state.showTransactionModal,
  showAccountsModal: state.showAccountsModal,
  dashboardHeader: state.dashboardHeader,
  userBalances: state.userBalances,
  sidebarToggleState: state.sidebarToggleState,
  blockAccordionIndex: state.blockAccordionIndex,
  userTransactions: state.userTransactions,
  selectedTransactionWallet: state.selectedTransactionWallet,
  transactionsSuccess: state.transactionsSuccess,
  localConfig: state.localConfig,
  selectedContractsTab: state.selectedContractsTab,
  selectedContractStorage: state.selectedContractStorage,
  selectedContractAmountBalance: state.selectedContractAmountBalance,
  isAvailableTezsterCli: state.isAvailableTezsterCli
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePage);
