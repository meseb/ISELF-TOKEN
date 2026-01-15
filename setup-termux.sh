#!/bin/bash
# SPDX-License-Identifier: MIT
# Quick setup script for Termux deployment of ISELF Token

echo "================================================"
echo "   ISELF Token - Thirdweb Deployment Setup"
echo "================================================"
echo ""

# Check if running on Termux
if [ -n "$TERMUX_VERSION" ]; then
    echo "✅ Termux environment detected"
else
    echo "⚠️  Warning: This script is designed for Termux"
    echo "   But it should work on any Linux system with bash"
fi

echo ""
echo "Step 1: Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "❌ Node.js is not installed"
    echo ""
    echo "To install on Termux, run:"
    echo "  pkg update && pkg install nodejs"
    exit 1
fi

echo ""
echo "Step 2: Checking npm installation..."
if command -v npm &> /dev/null; then
    echo "✅ npm is installed: $(npm --version)"
else
    echo "❌ npm is not installed"
    exit 1
fi

echo ""
echo "Step 3: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 4: Setting up environment configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo ""
    echo "⚠️  IMPORTANT: You need to edit .env file with your details:"
    echo "   1. THIRDWEB_SECRET_KEY - Get from https://thirdweb.com/dashboard/settings"
    echo "   2. PRIVATE_KEY - Your wallet private key (keep this secret!)"
    echo "   3. NETWORK - Network to deploy to (mumbai for testnet)"
    echo ""
    echo "To edit the .env file in Termux:"
    echo "  nano .env"
    echo ""
    echo "After editing:"
    echo "  - Press Ctrl+O to save"
    echo "  - Press Enter to confirm"
    echo "  - Press Ctrl+X to exit"
else
    echo "ℹ️  .env file already exists"
    echo "   If you need to reconfigure, edit it with: nano .env"
fi

echo ""
echo "================================================"
echo "Setup Complete! 🎉"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Edit your .env file: nano .env"
echo "2. Get testnet tokens from a faucet (for Mumbai: https://mumbaifaucet.com/)"
echo "3. Run deployment: npm run deploy"
echo ""
echo "For detailed instructions, see: README-TERMUX.md"
echo ""
