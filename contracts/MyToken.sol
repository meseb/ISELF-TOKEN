// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ISelfToken is ERC20, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10 ** 18;

    constructor(address treasury)
        ERC20("iSelf", "ISELF")
        ERC20Permit("iSelf")
    {
        require(treasury != address(0), "treasury=0");
        _mint(treasury, MAX_SUPPLY);
    }
}
