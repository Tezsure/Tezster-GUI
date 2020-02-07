import React from 'react';
import CreateAccounts from './CreateAccounts';
import RestoreAccounts from './RestoreAccounts';
import ValidateWallet from './ValidateWallet';

function AccountsModal(props) {
  const modalBody = () => {
    switch (props.modalType) {
      case 'create-accounts':
        return <CreateAccounts {...props} />;
      case 'restore-accounts':
        return <RestoreAccounts {...props} />;
      case 'validate-wallets':
        return <ValidateWallet {...props} />;
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
