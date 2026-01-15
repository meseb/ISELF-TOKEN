# ISELF Token - Quick Start for Termux Deployment

This quick start guide will help you deploy the ISELF token to blockchain networks using your Android tablet with Termux.

## 🚀 Quick Setup (5 minutes)

### 1. Open Termux and Install Prerequisites

```bash
# Update Termux packages
pkg update && pkg upgrade

# Install Node.js and Git
pkg install nodejs git

# Clone this repository
git clone https://github.com/meseb/ISELF-TOKEN.git
cd ISELF-TOKEN
```

### 2. Run the Setup Script

```bash
# Make the setup script executable (if needed)
chmod +x setup-termux.sh

# Run setup
./setup-termux.sh
```

This will:
- Check your Node.js installation
- Install all required dependencies
- Create your `.env` configuration file

### 3. Configure Your Deployment

Edit the `.env` file:

```bash
nano .env
```

You need to fill in:

1. **THIRDWEB_SECRET_KEY**: 
   - Visit https://thirdweb.com/dashboard/settings
   - Sign up/login to thirdweb
   - Create an API key
   - Copy the secret key

2. **PRIVATE_KEY**:
   - Export from MetaMask or your wallet
   - Remove the `0x` prefix if present
   - ⚠️ Never share this with anyone!

3. **NETWORK**:
   - Use `mumbai` for testing (free testnet)
   - Use `polygon` for mainnet (costs real money)

Example `.env` file:
```env
THIRDWEB_SECRET_KEY=abc123your_secret_key_here
PRIVATE_KEY=your_64_character_private_key_without_0x
NETWORK=mumbai
```

**Save the file:**
- Press `Ctrl + O` (WriteOut)
- Press `Enter`
- Press `Ctrl + X` (Exit)

### 4. Get Testnet Tokens

For Mumbai testnet (recommended for first deployment):

1. Visit https://mumbaifaucet.com/
2. Enter your wallet address
3. Click "Send Me MATIC"
4. Wait for tokens to arrive (1-2 minutes)

Your wallet address is the address associated with your private key. You can find it in MetaMask or use:
```bash
# This will show your wallet address when you run the deploy command
npm run deploy
```

### 5. Deploy Your Token! 🎉

```bash
npm run deploy
```

That's it! The script will:
- Connect to the blockchain
- Deploy your ISELF token contract
- Mint 1 billion tokens to your wallet
- Show you the contract address
- Save deployment details to a JSON file

### 6. View Your Token

After deployment, you'll get links to:
- **Block Explorer**: View your contract on-chain
- **Thirdweb Dashboard**: Manage your contract

You can also add the token to MetaMask:
1. Open MetaMask
2. Click "Import tokens"
3. Paste your contract address
4. The token should appear!

## 📱 Termux Tips

### Essential Keyboard Shortcuts

- `Volume Down + C` = Ctrl+C (cancel command)
- `Volume Down + D` = Ctrl+D (exit terminal)
- `Volume Down + L` = Clear screen
- Swipe from left = Show extra keys

### Useful Commands

```bash
# Check deployment status
ls deployment-*.json

# View deployment details
cat deployment-mumbai-*.json

# Reinstall dependencies if needed
rm -rf node_modules && npm install

# Update the repository
git pull
```

## 🆘 Troubleshooting

### "insufficient funds" Error

**Solution**: Your wallet needs cryptocurrency for gas fees.
- For testnet: Get free tokens from a faucet
- For mainnet: Send MATIC or ETH to your wallet

### "Module not found" Error

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Invalid private key" Error

**Solution**: Check your `.env` file
- Private key should be exactly 64 hex characters
- Remove `0x` prefix if present
- No spaces or newlines

### Internet Connection Issues

**Solution**: 
- Check your WiFi connection
- Try again in a few minutes
- Some networks might block blockchain connections

## 📖 Full Documentation

For detailed information, see:
- [README-TERMUX.md](README-TERMUX.md) - Complete Termux guide
- [Thirdweb Docs](https://portal.thirdweb.com/) - Thirdweb documentation
- [Termux Wiki](https://wiki.termux.com/) - Termux help

## 🔐 Security Reminders

1. ✅ **DO** keep your private key secret
2. ✅ **DO** test on testnet first
3. ✅ **DO** backup your `.env` file securely
4. ❌ **DON'T** share your private key or `.env` file
5. ❌ **DON'T** commit `.env` to git
6. ❌ **DON'T** deploy to mainnet until you're ready

## 💡 What's Next?

After deploying:

1. **Transfer tokens**: Send tokens to other addresses
2. **List on exchanges**: Submit to DEXs or CEXs
3. **Build dApps**: Use your token in applications
4. **Create website**: Build a landing page
5. **Community**: Build your token community

---

**Need help?** Check the full documentation in [README-TERMUX.md](README-TERMUX.md)

**Found a bug?** Open an issue on GitHub

**Have questions?** Join the thirdweb Discord: https://discord.gg/thirdweb
