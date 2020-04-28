/* eslint-disable react/prop-types */
import React from 'react';
import ActivateAccounts from './ActivateAccounts';
import RestoreAccounts from './RestoreAccounts';
import WalletAccounts from './WalletAccounts';

function AccountsModal(props) {
  const modalBody = () => {
    switch (props.showAccountsModal) {
      case 'activate-accounts':
        return <ActivateAccounts {...props} />;
      case 'restore-accounts':
        return <RestoreAccounts {...props} />;
      case 'show-user-wallet':
        return <WalletAccounts {...props} />;
      default:
        return <div />;
    }
  };
  let style = {
    display: 'block',
    paddingRight: '15px',
    opacity: 1,
  };
  if (props.showAccountsModal === 'show-user-wallet') {
    style.paddingTop = '15%';
  }
  return (
    <div className="modal fade show" role="dialog" style={style}>
      <div className="modal-dialog" role="document">
        {modalBody()}
      </div>
    </div>
  );
}

export default AccountsModal;
