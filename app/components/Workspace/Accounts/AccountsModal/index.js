/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import ActivateAccounts from './ActivateAccounts';
import NonFundraiserAccount from './NonFundraiserAccount';
import WalletAccounts from './WalletAccounts';

function AccountsModal(props) {
  const modalBody = () => {
    switch (props.showAccountsModal) {
      case 'activate-accounts':
        return <ActivateAccounts {...props} />;
      case 'restore-accounts':
        return <NonFundraiserAccount {...props} />;
      case 'show-user-wallet':
        return <WalletAccounts {...props} />;
      default:
        return <div />;
    }
  };
  const style = {
    display: 'block',
    paddingRight: '15px',
    opacity: 1,
  };
  if (props.showAccountsModal === 'show-user-wallet') {
    style.paddingTop = '10%';
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
