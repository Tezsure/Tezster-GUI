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
  getBalanceAction
} from '../actions/Workspace/accounts';
import {
  executeTransactionAction,
  getTransactionsAction,
  selectWalletAction
} from '../actions/Workspace/transactions';
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
  getBalanceAction: payload => dispatch(getBalanceAction(payload)),
  getAccountsAction: payload => dispatch(getAccountsAction(payload)),
  getTransactionsAction: payload => dispatch(getTransactionsAction(payload)),
  createAccountsAction: payload => dispatch(createAccountsAction(payload)),
  getDashboardHeaderAction: payload =>
    dispatch(getDashboardHeaderAction(payload)),
  sidebarToggleAction: payload => dispatch(sidebarToggleAction(payload)),
  selectWalletAction: payload => dispatch(selectWalletAction(payload)),
  handleTabChangeAction: payload => dispatch(handleTabChangeAction(payload)),
  executeTransactionAction: payload =>
    dispatch(executeTransactionAction(payload)),
  handleAccordionAction: payload => dispatch(handleAccordionAction(payload))
});
const mapStateToProps = state => ({
  userAccounts: state.userAccounts,
  dashboardHeader: state.dashboardHeader,
  userBalances: state.userBalances,
  sidebarToggleState: state.sidebarToggleState,
  blockAccordionIndex: state.blockAccordionIndex,
  userTransactions: state.userTransactions,
  selectedWallet: state.selectedWallet,
  transactionsSuccess: state.transactionsSuccess,
  currentTab: state.currentTab
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePage);
