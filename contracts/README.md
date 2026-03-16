# BaseYield Contracts (Prototype Scaffold)

This folder contains a simple Solidity architecture sketch for mode-based BaseYield vaults.

## Contracts

- `BaseYieldVault.sol` - shared vault logic, simulated accounting, reserve parameter storage
- `MoneyModeVault.sol` - stability-oriented profile
- `YieldModeVault.sol` - yield-oriented profile
- `VaultShareToken.sol` - minimal share token for vault accounting

## Design Notes

- Prototype-oriented and intentionally minimal
- Not audited and not production-ready
- Deposit/withdraw functions are conceptual and simulate accounting only
- No real asset transfer integration yet

## Commands

From repository root:

```bash
npm run contracts:compile
npm run contracts:test
```
