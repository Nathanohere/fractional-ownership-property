import React, { useState } from "react";
import { TransferTransaction, TokenAssociateTransaction } from "@hashgraph/sdk";
import { useHashConnect } from "../hooks/useHashConnect";

const TransferSharesForm = () => {
  const { executeTransaction, walletId } = useHashConnect();
  const [tokenId, setTokenId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    try {
      if (!tokenId || !toAccountId || !amount) {
        setStatus("❌ Please fill in all fields");
        return;
      }

      setStatus("⏳ Preparing to transfer shares...");

      // Ensure receiver is associated with token
      try {
        const associateTx = new TokenAssociateTransaction()
            .setAccountId(toAccountId)
            .setTokenIds([tokenId])
            .freeze();

        await executeTransaction(associateTx);
        console.log("✅ Token associated successfully");
      } catch (assocErr) {
        console.log("⚠️ Token already associated or skipped", assocErr.message);
      }

      // Perform token transfer
      const transferTx = new TransferTransaction()
          .addTokenTransfer(tokenId, walletId, -Number(amount))
          .addTokenTransfer(tokenId, toAccountId, Number(amount))
          .freeze();

      const result = await executeTransaction(transferTx);
      setStatus(`✅ Transferred ${amount} shares of ${tokenId} to ${toAccountId}`);
      console.log("Transfer Result:", result);
    } catch (err) {
      console.error("Transfer error:", err);
      setStatus("❌ Error transferring shares");
    }
  };

  return (
    <div className="p-6 border rounded-lg mt-6">
      <h3 className="text-lg font-bold mb-2">Transfer Property Shares</h3>
      <input
        type="text"
        placeholder="Token ID"
        className="border p-2 w-full mb-2"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver Account ID (0.0.xxxx)"
        className="border p-2 w-full mb-2"
        value={toAccountId}
        onChange={(e) => setToAccountId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleTransfer}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Transfer Shares
      </button>
      <p className="mt-2 text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default TransferSharesForm;
