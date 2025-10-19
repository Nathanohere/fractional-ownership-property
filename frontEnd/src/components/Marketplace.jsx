import React from "react";

const Marketplace = ({ tokens }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Tokenized Properties</h2>
      <ul>
        {tokens.length > 0 ? (
          tokens.map((t) => (
            <li key={t.tokenId} className="border p-2 mb-2 rounded">
              <strong>{t.name}</strong> — {t.totalShares} shares
            </li>
          ))
        ) : (
          <p>No properties yet. Create one!</p>
        )}
      </ul>
    </div>
  );
};

export default Marketplace;
