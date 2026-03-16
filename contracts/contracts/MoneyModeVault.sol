// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseYieldVault.sol";

/// @title MoneyModeVault
/// @notice Prototype vault profile emphasizing stability and reserve coverage.
contract MoneyModeVault is BaseYieldVault {
    constructor()
        BaseYieldVault(
            "Money Mode",
            "BaseYield Money Share",
            "byMONEY",
            1_000, // 10% reserve
            7_000, // 70% STRC exposure
            2_000 // 20% treasury or cash sleeve
        )
    {}
}
