/* eslint-disable react/prop-types */
import React from 'react';
import ActivateAccounts from './ActivateAccounts';
import RestoreAccounts from './RestoreAccounts';

function AccountsModal(props) {
  const modalBody = () => {
    switch (props.showAccountsModal) {
      case 'activate-accounts':
        return <ActivateAccounts {...props} />;
      case 'restore-accounts':
        return <RestoreAccounts {...props} />;
      default:
        return <div />;
    }
  };
  return (
    <div
      className="modal fade show"
      role="dialog"
      style={{
        display: 'block',
        paddingRight: '15px',
        opacity: 1
      }}
    >
      <div className="modal-dialog" role="document">
        {modalBody()}
      </div>
    </div>
  );
}

export default AccountsModal;
