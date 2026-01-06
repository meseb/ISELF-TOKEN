// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol";
import "../contracts/MyToken.sol";

contract MyTokenTest is MyToken {

    function testTokenInitialValues() public {
        Assert.equal(name(), "MyToken", "token name did not match");
        Assert.equal(symbol(), "MTK", "token symbol did not match");
        Assert.equal(decimals(), 18, "token decimals did not match");
        Assert.equal(totalSupply(), 0, "token supply should be zero");
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract IselfToken is ERC20, Ownable {
    constructor() ERC20("HumanSafe", "ISELF") Ownable(msg.sender) {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}