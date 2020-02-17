import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workspace from '../components/Workspace';
import {
  sidebarToggleAction,
  handleAccordionAction,
  handleTabChangeAction
} from '../actions/Workspace/sidebar';

import {
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
  deployContractAction,
  showContractHistoryAction
} from '../actions/Workspace/contracts';
import getDashboardHeaderAction from '../actions/Workspace/dashboardHeader';

class WorkspacePage extends Component {
  componentDidMount() {
    this.props.getAccountsAction({ ...this.props });
    this.props.getDashboardHeaderAction({ ...this.props });
  }
  render() {
    return <Workspace {...this.props} />;
  }
}
const mapDispatchToProps = dispatch => ({
  restoreAccountAction: payload => dispatch(restoreAccountAction(payload)),
  toggleTransactionModalAction: payload =>
    dispatch(toggleTransactionModalAction(payload)),
  getBalanceAction: payload => dispatch(getBalanceAction(payload)),
  getAccountsAction: payload => dispatch(getAccountsAction(payload)),
  getTransactionsAction: payload => dispatch(getTransactionsAction(payload)),
  deployContractAction: payload => dispatch(deployContractAction(payload)),
  createAccountsAction: payload => dispatch(createAccountsAction(payload)),
  toggleAccountsModalAction: payload =>
    dispatch(toggleAccountsModalAction(payload)),
  showContractHistoryAction: payload =>
    dispatch(showContractHistoryAction(payload)),
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
  handleAccordionAction: payload => dispatch(handleAccordionAction(payload))
});
const mapStateToProps = state => ({
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
  selectedContractsTab: state.selectedContractsTab,
  currentTab: state.currentTab
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePage);
