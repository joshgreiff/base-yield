// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VaultShareToken.sol";

/// @title BaseYieldVault
/// @notice Prototype vault scaffold for BaseYield mode wrappers.
/// @dev This contract is a conceptual architecture artifact and not production-ready.
abstract contract BaseYieldVault {
    struct VaultConfig {
        uint16 reserveRatioBps;
        uint16 strcExposureBps;
        uint16 tacticalSleeveBps;
        bool withdrawalsPaused;
    }

    VaultConfig public config;
    VaultShareToken public shareToken;
    address public owner;
    string public modeName;

    uint256 public totalAssets;

    event Deposit(address indexed user, uint256 assets, uint256 sharesMinted);
    event Withdraw(address indexed user, uint256 sharesBurned, uint256 assetsReturned);
    event ReserveRatioUpdated(uint16 previousBps, uint16 nextBps);
    event WithdrawalsPaused(bool isPaused);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor(
        string memory _modeName,
        string memory shareName,
        string memory shareSymbol,
        uint16 reserveRatioBps,
        uint16 strcExposureBps,
        uint16 tacticalSleeveBps
    ) {
        require(reserveRatioBps <= 10_000, "reserve");
        require(strcExposureBps <= 10_000, "strc");
        require(tacticalSleeveBps <= 10_000, "tactical");
        owner = msg.sender;
        modeName = _modeName;
        shareToken = new VaultShareToken(shareName, shareSymbol, address(this));
        config = VaultConfig({
            reserveRatioBps: reserveRatioBps,
            strcExposureBps: strcExposureBps,
            tacticalSleeveBps: tacticalSleeveBps,
            withdrawalsPaused: false
        });
    }

    /// @notice Prototype deposit interface.
    /// @dev This does not transfer real assets; it only increments simulated accounting.
    function deposit(uint256 assets) external virtual returns (uint256 sharesMinted) {
        require(assets > 0, "assets");
        sharesMinted = previewDeposit(assets);
        totalAssets += assets;
        shareToken.mint(msg.sender, sharesMinted);
        emit Deposit(msg.sender, assets, sharesMinted);
    }

    /// @notice Prototype withdraw interface.
    /// @dev This does not settle a real asset transfer; it decrements simulated accounting only.
    function withdraw(uint256 shares) external virtual returns (uint256 assetsReturned) {
        require(!config.withdrawalsPaused, "paused");
        require(shares > 0, "shares");
        assetsReturned = previewRedeem(shares);
        require(totalAssets >= assetsReturned, "insufficient assets");

        shareToken.burn(msg.sender, shares);
        totalAssets -= assetsReturned;
        emit Withdraw(msg.sender, shares, assetsReturned);
    }

    function setReserveRatio(uint16 nextReserveRatioBps) external onlyOwner {
        require(nextReserveRatioBps <= 10_000, "reserve");
        uint16 previous = config.reserveRatioBps;
        config.reserveRatioBps = nextReserveRatioBps;
        emit ReserveRatioUpdated(previous, nextReserveRatioBps);
    }

    function setWithdrawalsPaused(bool isPaused) external onlyOwner {
        config.withdrawalsPaused = isPaused;
        emit WithdrawalsPaused(isPaused);
    }

    function previewDeposit(uint256 assets) public view virtual returns (uint256 shares) {
        uint256 supply = shareToken.totalSupply();
        if (supply == 0 || totalAssets == 0) {
            return assets;
        }
        shares = (assets * supply) / totalAssets;
    }

    function previewRedeem(uint256 shares) public view virtual returns (uint256 assets) {
        uint256 supply = shareToken.totalSupply();
        if (supply == 0 || totalAssets == 0) {
            return shares;
        }
        assets = (shares * totalAssets) / supply;
    }
}
