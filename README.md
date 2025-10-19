# 🏠 FracProp — Fractional Real Estate Investment on Hedera

FracProp is a **decentralized fractional real estate investment platform** built on the **Hedera Hashgraph Network**.  
It allows users to tokenize, own, and trade fractions of real estate properties securely and transparently using **HTS (Hedera Token Service)** and **HashPack wallet**.

---

## 🚀 Features

- 🏗️ **Property Tokenization** — Create real estate assets as fungible HTS tokens.
- 💰 **Fractional Ownership** — Investors can buy and sell property shares.
- 🔐 **Secure Wallet Integration** — Connect and sign with HashPack wallet (Testnet).
- 🌐 **Decentralized Marketplace** — Trade and transfer shares peer-to-peer.
- 📊 **Transparent Ledger** — All transactions are verified on Hedera.

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React + Vite + TailwindCSS |
| **Decentralized public ledger** | Hedera Hashgraph (Testnet) |
| **Wallet Integration** | HashConnect + HashPack |
| **Backend** | Node.js + Express |
| **Tokenization** | Hedera Token Service (HTS) |
| **State Management** | React Hooks |
| **Communication** | Axios REST API |

---

## 🧩 Project Structure
fracprop/
├── backend/
│ ├── index.js
│ ├── package.json
│ ├── .env
│ └── routes/
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── index.css
│ │ └── components/
│ │ ├── ConnectWallet.jsx
│ │ ├── CreatePropertyForm.jsx
│ │ ├── MintSharesForm.jsx
│ │ ├── TransferSharesForm.jsx
│ │ └── Marketplace.jsx
│ ├── vite.config.js
│ ├── package.json
│ └── tailwind.config.js
│
└── README.md
---

## ⚙️ Installation & Setup

### 🖥️ Prerequisites

Make sure you have:
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [HashPack Wallet](https://www.hashpack.app/) (Testnet mode enabled)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/fracprop-hedara.git
cd fracprop-hedara



