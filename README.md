# ISELF Token

A blockchain-based ERC-20 token built with Solidity and deployable via thirdweb.

## 🎯 About ISELF Token

- **Token Name**: iself
- **Symbol**: ISELF
- **Total Supply**: 1,000,000,000 (1 billion tokens)
- **Standard**: ERC-20
- **Blockchain**: Multi-chain compatible (Ethereum, Polygon, etc.)

## 📱 Deploy from Android Tablet (Termux)

This project includes comprehensive tools for deploying the ISELF token directly from your Android tablet using Termux.

### Quick Start

```bash
# Install Termux from F-Droid, then run:
pkg install nodejs git
git clone https://github.com/meseb/ISELF-TOKEN.git
cd ISELF-TOKEN
./setup-termux.sh
nano .env  # Configure your settings
npm run deploy
```

### 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide for Termux
- **[README-TERMUX.md](README-TERMUX.md)** - Complete Termux deployment guide
- **[.env.example](.env.example)** - Configuration template

## 🚀 Features

✅ **Termux Compatible**: Deploy directly from your Android tablet  
✅ **Thirdweb Integration**: Easy deployment with thirdweb SDK  
✅ **Multi-Network Support**: Deploy to testnets or mainnet  
✅ **Automated Setup**: One-command setup script  
✅ **Comprehensive Guides**: Detailed documentation for beginners  
✅ **Security First**: Built-in security best practices  

## 📦 What's Included

```
ISELF-TOKEN/
├── contracts/              # Solidity smart contracts
├── deploy-thirdweb.js     # Thirdweb deployment script
├── setup-termux.sh        # Automated setup for Termux
├── package.json           # Node.js dependencies
├── .env.example           # Configuration template
├── QUICKSTART.md          # Quick start guide
├── README-TERMUX.md       # Full Termux guide
└── IselfToken_compData.json  # Compiled contract data
```

## 🛠️ Requirements

- **Termux** (for Android deployment) or **Node.js** (for desktop)
- **Thirdweb Account** - Free at [thirdweb.com](https://thirdweb.com)
- **Crypto Wallet** - MetaMask or similar
- **Gas Tokens** - For deployment fees

## 🌐 Deployment Networks

| Network | Type | Use Case |
|---------|------|----------|
| Mumbai | Testnet | Free testing |
| Polygon | Mainnet | Low-cost production |
| Goerli/Sepolia | Testnet | Ethereum testing |
| Ethereum | Mainnet | Production (expensive) |

## 📖 Usage

### Option 1: Termux (Android Tablet)

Best for mobile deployment. See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide.

### Option 2: Desktop/Server

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env

# Deploy
npm run deploy
```

## 🔐 Security

- ✅ Private keys stored in `.env` (never committed)
- ✅ `.gitignore` configured to exclude sensitive files
- ✅ Deployment to testnet recommended first
- ✅ All tokens minted to deployer wallet

**⚠️ Important**: Never share your private key or commit your `.env` file!

## 📄 Smart Contract

The ISELF token contract is a standard ERC-20 implementation:

```solidity
contract IselfToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("iself", "ISELF") {
        require(initialSupply > 0, "iself: initial supply must be > 0");
        _mint(msg.sender, initialSupply);
    }
}
```

- Based on OpenZeppelin contracts
- Fixed supply minted at deployment
- All tokens go to deployer address
- Standard ERC-20 functions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- **Documentation**: See [README-TERMUX.md](README-TERMUX.md)
- **Thirdweb Help**: [portal.thirdweb.com](https://portal.thirdweb.com/)
- **Issues**: Open an issue on GitHub
- **Discord**: [discord.gg/thirdweb](https://discord.gg/thirdweb)

## 📜 License

MIT License - See [LICENSE](licenze/) for details

## 🎓 Learn More

- [What is an ERC-20 Token?](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Termux Wiki](https://wiki.termux.com/)
- [Solidity Documentation](https://docs.soliditylang.org/)

---

**Ready to deploy?** Start with the [QUICKSTART.md](QUICKSTART.md) guide!

**Using Termux?** Check out [README-TERMUX.md](README-TERMUX.md) for detailed instructions!
