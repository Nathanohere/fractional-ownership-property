import React, { useState } from "react";
import { TokenMintTransaction } from "@hashgraph/sdk";
import { useHashConnect } from "../hooks/useHashConnect";

const MintSharesForm = () => {
  const { executeTransaction } = useHashConnect();
  const [tokenId, setTokenId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleMint = async () => {
    try {
      if (!tokenId || !amount) {
        setStatus("❌ Please enter Token ID and amount");
        return;
      }

      setStatus("⏳ Minting shares...");

      const tx = new TokenMintTransaction()
        .setTokenId(tokenId)
        .setAmount(Number(amount))
        .freeze();

      const result = await executeTransaction(tx);

      setStatus(`✅ ${amount} shares minted successfully for ${tokenId}`);
      console.log("Mint Transaction Result:", result);
    } catch (err) {
      console.error("Mint error:", err);
      setStatus("❌ Error minting shares");
    }
  };

  return (
    <div className="p-6 border rounded-lg mt-6">
      <h3 className="text-lg font-bold mb-2">Mint Property Shares</h3>
      <input
        type="text"
        placeholder="Token ID (e.g., 0.0.123456)"
        className="border p-2 w-full mb-2"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount to Mint"
        className="border p-2 w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleMint}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Mint Shares
      </button>
      <p className="mt-2 text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default MintSharesForm;
