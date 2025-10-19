import React from "react";
import { useHashConnect } from "../hooks/useHashConnect";

const ConnectWallet = ({ onConnect }) => {
  const { pairingData } = useHashConnect();

  return (
    <div className="p-4 text-center">
      {pairingData ? (
        <>
          <h3 className="text-green-600 font-semibold">
            ✅ Connected to: {pairingData.accountIds[0]}
          </h3>
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => onConnect(pairingData.accountIds[0])}
          >
            Continue
          </button>
        </>
      ) : (
        <p className="text-gray-600">Connect your HashPack wallet to continue</p>
      )}
    </div>
  );
};

export default ConnectWallet;
