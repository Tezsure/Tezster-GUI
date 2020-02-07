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
  createAccountsAction: payload => dispatch(createAccountsAction(payload)),
  getDashboardHeaderAction: payload =>
    dispatch(getDashboardHeaderAction(payload)),
  sidebarToggleAction: payload => dispatch(sidebarToggleAction(payload)),
  handleTabChangeAction: payload => dispatch(handleTabChangeAction(payload)),
  handleAccordionAction: payload => dispatch(handleAccordionAction(payload))
});
const mapStateToProps = state => ({
  userAccounts: state.userAccounts,
  dashboardHeader: state.dashboardHeader,
  userBalances: state.userBalances,
  sidebarToggleState: state.sidebarToggleState,
  blockAccordionIndex: state.blockAccordionIndex,
  currentTab: state.currentTab
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacePage);
