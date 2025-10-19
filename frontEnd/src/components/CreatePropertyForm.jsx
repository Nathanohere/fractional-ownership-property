import React, { useState } from "react";
import { TokenCreateTransaction, TokenType, TokenSupplyType, Hbar } from "@hashgraph/sdk";
import { useHashConnect } from "../hooks/useHashConnect";

const CreatePropertyForm = () => {
  const { executeTransaction, walletId } = useHashConnect();
  const [propertyName, setPropertyName] = useState("");
  const [totalShares, setTotalShares] = useState(1000);
  const [status, setStatus] = useState("");

  const handleCreate = async () => {
    try {
      setStatus("Creating property token...");

      const tx = await new TokenCreateTransaction()
        .setTokenName(propertyName)
        .setTokenSymbol(propertyName.slice(0, 4).toUpperCase())
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(walletId)
        .setInitialSupply(0)
        .setDecimals(0)
        .setMaxSupply(Number(totalShares))
        .setSupplyType(TokenSupplyType.Finite)
        .setAutoRenewAccountId(walletId)
        .setAutoRenewPeriod(7776000)
        .setMaxTransactionFee(new Hbar(10))
        .freeze();

      const result = await executeTransaction(tx);
      setStatus(`✅ Token created! Transaction: ${result?.receipt?.status}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error creating token");
    }
  };

  return (
    <div className="p-6 border rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-3">Create New Property Token</h3>
      <input
        type="text"
        placeholder="Property Name"
        className="border p-2 w-full mb-2"
        value={propertyName}
        onChange={(e) => setPropertyName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Shares"
        className="border p-2 w-full mb-2"
        value={totalShares}
        onChange={(e) => setTotalShares(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Token
      </button>
      <p className="mt-2 text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default CreatePropertyForm;
