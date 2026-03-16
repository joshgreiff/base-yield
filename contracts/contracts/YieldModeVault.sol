// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BaseYieldVault.sol";

/// @title YieldModeVault
/// @notice Prototype vault profile emphasizing higher yield potential.
contract YieldModeVault is BaseYieldVault {
    constructor()
        BaseYieldVault(
            "Yield Mode",
            "BaseYield Yield Share",
            "byYIELD",
            500, // 5% reserve
            9_000, // 90% STRC exposure
            500 // 5% tactical sleeve
        )
    {}
}
