import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import CreatePropertyForm from './components/CreatePropertyForm';
import MintSharesForm from './components/MintSharesForm';
import TransferSharesForm from './components/TransferSharesForm';
import Marketplace from './components/Marketplace';

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [accountId, setAccountId] = useState(null);
  const [tokens, setTokens] = useState([]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">🏠 FracProp</h1>
      {!accountId ? (
        <ConnectWallet onConnect={setAccountId} />
      ) : (
        <>
          <CreatePropertyForm accountId={accountId} />
          <MintSharesForm />
          <TransferSharesForm />
          <Marketplace tokens={tokens} />
        </>
      )}
    </div>
  );
};

export default App;
