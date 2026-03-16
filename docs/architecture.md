# BaseYield Architecture (Prototype Direction)

## Objective

Create configurable onchain wrappers around digital credit exposure, beginning with STRC-linked strategies represented through two product modes.

## High-Level System

1. **Offchain Credit Layer (conceptual)**
   - Custody, settlement, and credit rails
   - Verification and reporting interfaces
   - SPV or trust wrapper concepts (future exploration)

2. **Onchain Wrapper Layer (Base)**
   - Vault contracts encode mode parameters
   - Shares represent proportional claim on vault accounting
   - Reserve policy governs redemption flexibility and stability

3. **Application Layer**
   - Dashboard surfaces exposures, reserve levels, and simulated outcomes
   - Users choose between Money Mode and Yield Mode
   - Configuration controls illustrate programmable tradeoffs

## Vault Accounting Model (Prototype)

Each vault tracks:

- total assets
- total shares
- reserve ratio
- mode metadata (liquidity profile, strategy intent)

Illustrative net asset value (NAV) is surfaced in the app through simulation logic.  
Future iterations can replace simulated sources with oracle or partner feeds.

## Reserve Buffers

Reserve buffers are first-class policy parameters:

- Higher reserve: lower yield potential, improved redemption coverage
- Lower reserve: higher yield potential, reduced immediate redemption capacity

The prototype includes a slider to demonstrate how reserve policy can dynamically affect estimated APY, volatility, and liquidity descriptors.

## Redemption Logic (Directionally)

Potential redemption flow in production direction:

1. User submits redemption request
2. Contract checks reserve availability and queue constraints
3. Immediate redemptions consume reserve where possible
4. Excess demand is queued for periodic settlement windows

The current repository does not implement queue mechanics; it provides the conceptual scaffold.

## Tokenized Access to Digital Credit

Vault share tokens can represent user positions in mode-specific wrappers:

- `MoneyModeVault` share token for stability-focused profile
- `YieldModeVault` share token for higher-yield profile

Tokenized wrappers create composability opportunities while preserving clear risk segmentation by mode.

## Security and Compliance Notes

This prototype is not audited and not production-ready.  
Future architecture would require:

- formal security reviews
- risk controls and circuit breakers
- legal/regulatory structuring
- robust transparency and reporting standards
