import './DepositPopup.css';
import { useCopyToClipboard } from '../hooks/useCopy';
import Modal from './Modal';
import { useToast } from '@chakra-ui/react';
import { useDeposit } from '../hooks/useDeposit';
import { ADDRESS } from '../utils/constants';

const DepositPopup = ({ isOpenDeposit, onCloseDeposit, user }) => {
  const copyToClipboard = useCopyToClipboard();

  const toast = useToast();

  const { isLoading, depositToEliteplay } = useDeposit();

  const address = ADDRESS;

  return (
    <Modal title={"Deposit"} isOpen={isOpenDeposit} close={onCloseDeposit}>
      <div className="deposit-details">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '30px',
        }}>
          <div className='deposit-cp'>
            <p>Deposit Currency</p>
            <div className="deposit-address">
              <span className="eg-address">
                <span className="eAddress">eGold</span>
              </span>
            </div>
          </div>
          <div className='deposit-cp'>
            <p>Account Id</p>
            <div className="deposit-address">
              <span className="eg-address">
                <span className="eAddress">{address}</span>
              </span>
              <span
                onClick={() => {
                  copyToClipboard(address);
                }}
                className="copy-bx"
              >
                <img src="./copy-01.svg" alt="" /> Copy
              </span>
            </div>
          </div>
          <div className='deposit-cp'>
            <p>User Id</p>
            <div className="deposit-address">
              <span className="eg-address">
                <span className="eAddress">{user?._id}</span>
              </span>
              <span
                onClick={() => {
                  copyToClipboard(user?._id);
                }}
                className="copy-bx"
              >
                <img src="./copy-01.svg" alt="" /> Copy
              </span>
            </div>
          </div>
        </div>
        <div className="depositpopup-min">
          <img src="./alert-01.svg" alt="alert-icon" />
          <span>
            Please add your user id as description in the transaction
          </span>
        </div>
        <div className="depositpopup-min">
          <img src="./alert-01.svg" alt="alert-icon" />
          <span>Minimum Deposit: 1 eGold</span>
        </div>
        <button className='makeDeposit' onClick={() => {
          const redirectUrl = `https://www.elitepvpers.com/theblackmarket/profile/${address}`;
          toast({
            title: 'Redirecting to Elitepvypers',
            description: `You will be redirected to elitepvpers.com in 5 seconds to make a deposit to ${address}. If you are not automatically redirected, use the following link: ${redirectUrl}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          setTimeout(() => {
            window.open(redirectUrl, '_blank');
          }, 5000);
        }}>
          Make a deposit
        </button>
        <div className="deposit_fiat-btn">
          <button onClick={depositToEliteplay}>
            {isLoading ? (
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Confirm Deposit'
            )}
          </button>
        </div>
      </div>
      <div className="depositpopup-notice">
        <span className="notice-txt">NOTICE: </span>{' '}
        <span>
          Please wait for your deposit to reflect 30 mins after
          transaction.
        </span>
      </div>
    </Modal>
  );
};

export default DepositPopup;
