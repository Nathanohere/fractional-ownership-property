import { useEffect, useState } from "react";
import { HashConnect } from "hashconnect";
import { Client, AccountId, Transaction } from "@hashgraph/sdk";

const appMetadata = {
  name: "FracProp",
  description: "Fractional Real Estate Investment on Hedera",
  icon: "https://hedera.com/favicon.ico",
};

export const useHashConnect = () => {
  const [hashConnect, setHashConnect] = useState(null);
  const [pairingData, setPairingData] = useState(null);
  const [topic, setTopic] = useState(null);
  const [walletId, setWalletId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const hc = new HashConnect();
      const initData = await hc.init(appMetadata, "testnet", false);

      setTopic(initData.topic);
      hc.foundExtensionEvent.once((walletMetadata) => {
        hc.connectToLocalWallet();
      });

      hc.pairingEvent.once((pairingData) => {
        setPairingData(pairingData);
        setWalletId(pairingData.accountIds[0]);
      });

      setHashConnect(hc);
    };

    init();
  }, []);

  
  const executeTransaction = async (tx) => {
    if (!hashConnect || !pairingData) throw new Error("Wallet not connected");

    const accountId = AccountId.fromString(pairingData.accountIds[0]);
    const client = Client.forNetwork({ "testnet": "testnet.hashio.io/api" });
    client.setOperator(accountId, null); // no private key, wallet will sign

    const txBytes = tx.toBytes();
    const transaction = {
      topic,
      byteArray: txBytes,
      metadata: {
        accountToSign: accountId.toString(),
        returnTransaction: true,
        hideNft: false,
      },
    };

    const result = await hashConnect.sendTransaction(
      pairingData.pairingTopic,
      transaction
    );

    return result;
  };

  return { hashConnect, pairingData, walletId, executeTransaction };
};

