// SPDX-License-Identifier: MIT
/**
 * Thirdweb Deployment Script for ISELF Token
 * 
 * This script deploys the ISelfToken contract using thirdweb SDK
 * Compatible with Termux on Android tablets
 * 
 * Prerequisites:
 * 1. Install Node.js on Termux: pkg install nodejs
 * 2. Install dependencies: npm install
 * 3. Copy .env.example to .env and fill in your details
 * 4. Run: npm run deploy
 */

require('dotenv').config();
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Configuration validation
function validateConfig() {
  const requiredVars = ['THIRDWEB_SECRET_KEY', 'PRIVATE_KEY', 'NETWORK'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Error: Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\n💡 Please copy .env.example to .env and fill in your details');
    process.exit(1);
  }

  // Validate private key format
  const privateKey = process.env.PRIVATE_KEY.startsWith('0x') 
    ? process.env.PRIVATE_KEY 
    : '0x' + process.env.PRIVATE_KEY;
  
  if (privateKey.length !== 66) {
    console.error('❌ Error: PRIVATE_KEY appears to be invalid (should be 64 hex characters)');
    process.exit(1);
  }

  return privateKey;
}

// Network configuration
const NETWORK_CONFIG = {
  mumbai: {
    name: 'Mumbai Testnet',
    chainId: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    explorer: 'https://mumbai.polygonscan.com'
  },
  polygon: {
    name: 'Polygon Mainnet',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com'
  },
  goerli: {
    name: 'Goerli Testnet',
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorer: 'https://goerli.etherscan.io'
  },
  sepolia: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorer: 'https://sepolia.etherscan.io'
  },
  ethereum: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://cloudflare-eth.com',
    explorer: 'https://etherscan.io'
  }
};

async function deployToken() {
  console.log('🚀 ISELF Token Deployment Script (Thirdweb)\n');
  console.log('=' .repeat(60));

  try {
    // Validate configuration
    const privateKey = validateConfig();
    const network = process.env.NETWORK.toLowerCase();

    if (!NETWORK_CONFIG[network]) {
      console.error(`❌ Error: Unsupported network "${network}"`);
      console.error(`   Supported networks: ${Object.keys(NETWORK_CONFIG).join(', ')}`);
      process.exit(1);
    }

    const networkInfo = NETWORK_CONFIG[network];
    console.log(`📡 Network: ${networkInfo.name} (Chain ID: ${networkInfo.chainId})`);
    console.log(`🔑 Using wallet: ${new ethers.Wallet(privateKey).address}`);
    console.log(`💡 Note: All tokens will be minted to the deployer wallet\n`);

    // Initialize thirdweb SDK
    console.log('⚙️  Initializing Thirdweb SDK...');
    const sdk = ThirdwebSDK.fromPrivateKey(
      privateKey,
      network,
      {
        secretKey: process.env.THIRDWEB_SECRET_KEY,
      }
    );

    console.log('✅ SDK initialized\n');

    // Get the wallet address
    const wallet = await sdk.wallet.getAddress();
    console.log(`💼 Deploying from wallet: ${wallet}`);

    // Check wallet balance
    const balance = await sdk.wallet.balance();
    console.log(`💰 Wallet balance: ${ethers.utils.formatEther(balance.value)} ${balance.symbol}`);
    
    if (balance.value.eq(0)) {
      console.error('\n❌ Error: Wallet has no funds. Please add some ETH/MATIC to deploy.');
      console.error(`   Send funds to: ${wallet}`);
      process.exit(1);
    }

    console.log('\n📝 Deploying ISelfToken contract...');
    console.log('   Token Name: iself');
    console.log('   Token Symbol: ISELF');
    console.log('   Decimals: 18');
    console.log('   Initial Supply: 1,000,000,000 ISELF (1 billion tokens)\n');

    // Read the contract bytecode
    const contractJsonPath = path.join(__dirname, 'IselfToken_compData.json');
    let contractData;
    
    if (fs.existsSync(contractJsonPath)) {
      contractData = JSON.parse(fs.readFileSync(contractJsonPath, 'utf8'));
      console.log('✅ Contract compilation data loaded');
      
      // Parse metadata to get bytecode
      const metadata = JSON.parse(contractData.metadata);
      console.log(`   Compiler: Solidity ${metadata.compiler.version}`);
    } else {
      console.error('❌ Error: Contract compilation data not found');
      console.error(`   Expected at: ${contractJsonPath}`);
      console.error('   Please compile the contract first in Remix');
      process.exit(1);
    }

    // The contract expects initialSupply as constructor parameter
    // Let's deploy 1 billion tokens (1000000000 * 10^18)
    const initialSupply = ethers.BigNumber.from('1000000000').mul(
      ethers.BigNumber.from('10').pow(18)
    );

    // Deploy using thirdweb
    console.log('\n⏳ Deploying contract (this may take a minute)...');
    console.log(`   Initial Supply: ${ethers.utils.formatEther(initialSupply)} ISELF\n`);
    
    const contractAddress = await sdk.deployer.deployContractFromAbi(
      contractData.bytecode.object,
      contractData.abi,
      [initialSupply.toString()],
      {
        name: 'ISelfToken',
        symbol: 'ISELF',
      }
    );

    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS! Contract deployed!');
    console.log('='.repeat(60));
    console.log(`📍 Contract Address: ${contractAddress}`);
    console.log(`🔍 View on Explorer: ${networkInfo.explorer}/address/${contractAddress}`);
    console.log(`🔗 Thirdweb Dashboard: https://thirdweb.com/${network}/${contractAddress}`);
    console.log('='.repeat(60));

    // Save deployment info
    const deploymentInfo = {
      network: networkInfo.name,
      chainId: networkInfo.chainId,
      contractAddress: contractAddress,
      deployerAddress: wallet,
      initialSupply: initialSupply.toString(),
      timestamp: new Date().toISOString(),
      explorerUrl: `${networkInfo.explorer}/address/${contractAddress}`,
      thirdwebUrl: `https://thirdweb.com/${network}/${contractAddress}`
    };

    const deploymentFile = path.join(__dirname, `deployment-${network}-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\n💾 Deployment info saved to: ${path.basename(deploymentFile)}\n`);

    // Verify the deployment
    console.log('🔍 Verifying deployment...');
    const contract = await sdk.getContract(contractAddress);
    const tokenName = await contract.call('name');
    const tokenSymbol = await contract.call('symbol');
    const totalSupply = await contract.call('totalSupply');
    const deployerBalance = await contract.call('balanceOf', [wallet]);

    console.log(`\n✅ Contract verified:`);
    console.log(`   Name: ${tokenName}`);
    console.log(`   Symbol: ${tokenSymbol}`);
    console.log(`   Total Supply: ${ethers.utils.formatEther(totalSupply)} ISELF`);
    console.log(`   Deployer Balance: ${ethers.utils.formatEther(deployerBalance)} ISELF`);

    console.log('\n✨ Deployment complete!\n');

  } catch (error) {
    console.error('\n❌ Deployment failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('insufficient funds')) {
      console.error('\n💡 Tip: Make sure your wallet has enough funds to cover gas fees');
    } else if (error.message.includes('nonce')) {
      console.error('\n💡 Tip: Try again in a few seconds. There might be a pending transaction.');
    } else if (error.message.includes('network')) {
      console.error('\n💡 Tip: Check your internet connection and network configuration');
    }
    
    console.error('\n📚 For help, visit: https://portal.thirdweb.com/\n');
    process.exit(1);
  }
}

// Run deployment
if (require.main === module) {
  deployToken().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { deployToken };
