# Deploy ISELF Token on Thirdweb using Termux (Android Tablet)

This guide will help you deploy the ISELF Token smart contract to blockchain networks using thirdweb from your Android tablet via Termux.

## 📱 Prerequisites

### 1. Install Termux
- Download Termux from [F-Droid](https://f-droid.org/en/packages/com.termux/) (recommended) or Google Play Store
- Open Termux app on your tablet

### 2. Set up Termux Environment

Run these commands in Termux one by one:

```bash
# Update package list
pkg update && pkg upgrade

# Install required packages
pkg install nodejs git

# Verify installation
node --version
npm --version
git --version
```

### 3. Clone the Repository

```bash
# Navigate to a suitable directory
cd ~/

# Clone this repository (if not already cloned)
git clone https://github.com/meseb/ISELF-TOKEN.git

# Enter the project directory
cd ISELF-TOKEN
```

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@thirdweb-dev/sdk` - Thirdweb SDK for smart contract deployment
- `ethers` - Ethereum library for blockchain interactions
- `dotenv` - Environment variable management

### 2. Get Your Thirdweb Secret Key

1. Visit [thirdweb.com](https://thirdweb.com)
2. Sign up or log in
3. Go to [Dashboard > Settings](https://thirdweb.com/dashboard/settings)
4. Create a new API key (Secret Key)
5. Copy the secret key

### 3. Set Up Your Wallet

You need a wallet with:
- A private key (from MetaMask, Trust Wallet, etc.)
- Some cryptocurrency for gas fees:
  - **Mumbai Testnet**: Free MATIC from [faucet](https://mumbaifaucet.com/)
  - **Polygon Mainnet**: Real MATIC (buy from exchange)
  - **Goerli/Sepolia Testnet**: Free ETH from faucets
  - **Ethereum Mainnet**: Real ETH (expensive!)

**⚠️ SECURITY WARNING**: Never share your private key! Keep it secret!

To export private key from MetaMask:
1. Open MetaMask
2. Click on account menu
3. Select "Account details"
4. Click "Export Private Key"
5. Enter password and copy the key

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
nano .env
```

Fill in your details:

```env
# Your thirdweb secret key
THIRDWEB_SECRET_KEY=your_actual_secret_key_here

# Your wallet private key (without 0x prefix)
PRIVATE_KEY=your_actual_private_key_here

# Network to deploy to
NETWORK=mumbai
```

**Note**: All tokens will be minted to the deployer wallet address (the wallet associated with the private key you provide).

**Tip for Termux**: To save in nano editor:
- Press `Ctrl + O` (WriteOut)
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

## 🚀 Deployment

### Deploy to Testnet (Mumbai - Polygon Testnet)

Recommended for testing first:

```bash
npm run deploy
```

Or:

```bash
node deploy-thirdweb.js
```

### Deploy to Mainnet

⚠️ **Warning**: Mainnet deployment costs real money! Test on testnet first!

```bash
# Edit .env and change NETWORK to your target
nano .env

# Change NETWORK=mumbai to:
# NETWORK=polygon (for Polygon mainnet)
# NETWORK=ethereum (for Ethereum mainnet)

# Then deploy
npm run deploy
```

## 📋 Supported Networks

| Network | NETWORK value | Type | Gas Token |
|---------|---------------|------|-----------|
| Mumbai | `mumbai` | Testnet | Free MATIC |
| Polygon | `polygon` | Mainnet | MATIC |
| Goerli | `goerli` | Testnet | Free GoerliETH |
| Sepolia | `sepolia` | Testnet | Free SepoliaETH |
| Ethereum | `ethereum` | Mainnet | ETH |

## 📊 What Happens During Deployment

The script will:

1. ✅ Validate your configuration
2. 🔌 Connect to the blockchain network
3. 💰 Check your wallet balance
4. 📝 Deploy the ISelfToken contract
5. ✨ Mint 1,000,000,000 ISELF tokens to deployer wallet
6. 🔍 Verify the deployment
7. 💾 Save deployment information to a JSON file

## 🎯 After Deployment

Once deployed successfully, you'll receive:

- **Contract Address**: The address of your deployed token
- **Explorer Link**: View your contract on block explorer
- **Thirdweb Dashboard Link**: Manage your contract on thirdweb
- **Deployment JSON**: A file with all deployment details

### Access Your Token on Thirdweb

1. Visit the thirdweb dashboard link shown after deployment
2. You can:
   - View token information
   - Manage contract settings
   - Interact with contract functions
   - Monitor transfers and holders
   - Add custom contract features

### Add Token to MetaMask

1. Open MetaMask
2. Click "Import tokens"
3. Enter the contract address
4. Token symbol (ISELF) and decimals (18) should auto-populate
5. Click "Add Custom Token"

## 🔧 Troubleshooting

### Error: "insufficient funds"

**Solution**: Add more cryptocurrency to your wallet
- Testnet: Use a faucet
- Mainnet: Transfer from an exchange

### Error: "Invalid private key"

**Solution**: 
- Make sure private key is exactly 64 hex characters
- Remove `0x` prefix if present
- Check for extra spaces or newlines

### Error: "network error"

**Solution**:
- Check your internet connection
- Try again in a few seconds
- Some networks might be congested

### Error: "Cannot find module"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Termux Keyboard Tips

- `Volume Down + C` = Ctrl+C (cancel)
- `Volume Down + D` = Ctrl+D (exit)
- `Volume Down + L` = Clear screen
- Use extra keys row for special characters

## 🔒 Security Best Practices

1. **Never commit .env file** - It contains secrets!
2. **Use testnet first** - Always test before mainnet
3. **Keep private keys secure** - Never share or expose them
4. **Backup important files** - Save deployment JSONs safely
5. **Use hardware wallets** - For large amounts on mainnet
6. **Double-check addresses** - Mistakes are irreversible

## 📚 Additional Resources

- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Thirdweb Dashboard](https://thirdweb.com/dashboard)
- [Termux Wiki](https://wiki.termux.com/)
- [Mumbai Faucet](https://mumbaifaucet.com/)
- [Polygon Documentation](https://docs.polygon.technology/)

## 💬 Need Help?

- Thirdweb Discord: [discord.gg/thirdweb](https://discord.gg/thirdweb)
- Thirdweb Support: [thirdweb.com/support](https://thirdweb.com/support)
- Termux Community: [Reddit r/termux](https://reddit.com/r/termux)

## 📝 Contract Details

- **Name**: iself
- **Symbol**: ISELF
- **Total Supply**: 1,000,000,000 ISELF (1 billion tokens)
- **Decimals**: 18
- **Standard**: ERC-20
- **Features**:
  - Fixed supply (1 billion tokens)
  - All tokens minted to deployer at deployment
  - Standard ERC-20 implementation
  - OpenZeppelin contracts base

## 🔄 Updating the Deployment Script

To update the script:

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm install
```

---

**License**: MIT

**Repository**: https://github.com/meseb/ISELF-TOKEN

For questions about the ISELF token project, please refer to the main repository documentation.
