import React, {  } from 'react';
import WalletComponent from '../components/WalletComponent';
import 'react-loading-skeleton/dist/skeleton.css';
import './Wallet.css';


const Wallet = () => {
  return (
    <div style={{ padding: '0 1rem' }}>
      <WalletComponent />
    </div>
  );
};

export default Wallet;
