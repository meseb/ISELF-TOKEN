// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IselfToken is ERC20, Ownable {
    constructor() ERC20("HumanSafe", "ISELF") Ownable(msg.sender) {
        // 1 Miliardo di token
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}