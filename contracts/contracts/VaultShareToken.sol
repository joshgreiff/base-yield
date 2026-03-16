// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title VaultShareToken
/// @notice Minimal ERC20-like token scaffold for prototype vault share accounting.
/// @dev Prototype only; this implementation intentionally omits production controls.
contract VaultShareToken {
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    address public immutable vault;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    modifier onlyVault() {
        require(msg.sender == vault, "only vault");
        _;
    }

    constructor(string memory _name, string memory _symbol, address _vault) {
        name = _name;
        symbol = _symbol;
        vault = _vault;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 currentAllowance = allowance[from][msg.sender];
        require(currentAllowance >= value, "allowance");
        allowance[from][msg.sender] = currentAllowance - value;
        _transfer(from, to, value);
        return true;
    }

    function mint(address to, uint256 value) external onlyVault {
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }

    function burn(address from, uint256 value) external onlyVault {
        require(balanceOf[from] >= value, "balance");
        balanceOf[from] -= value;
        totalSupply -= value;
        emit Transfer(from, address(0), value);
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "to zero");
        require(balanceOf[from] >= value, "balance");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }
}
