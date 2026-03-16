# BaseYield Application Thesis

## One-Line Positioning

BaseYield is building Layer-3 digital money and digital yield products on Base, using STRC as a digital credit primitive built on Bitcoin-linked capital.

## Why STRC Is Different

Traditional preferred instruments are not designed for programmable, transparent, onchain composition.  
Our thesis is that STRC can become a bridge between Bitcoin-scale capital and credit-native product design:

- a credit-oriented instrument that can be wrapped with explicit policy controls
- a foundation for reserve-aware liquidity products
- a path toward clearer user-facing tradeoffs between stability and yield

In short, STRC is treated here as **digital credit infrastructure**, not just another yield input.

## Why Base Is the Right Layer-3 Venue

Base is a practical execution and distribution layer for early financial product design:

- low-cost transaction environment for iterative product rules
- mature EVM tooling for contracts, monitoring, and integration
- strong consumer distribution potential for wallet-native financial apps

This supports fast experimentation with vault policy parameters before deeper integrations.

## Why This Can Become Digital Money or Digital Yield

BaseYield starts from the idea that credit wrappers should be configurable, not one-size-fits-all.

- **Money Mode** targets lower volatility and stronger reserve posture
- **Yield Mode** targets higher return potential with reduced reserve coverage

Both modes derive from the same underlying digital credit thesis, but expose different combinations of:

- reserve ratio
- liquidity timing
- expected yield
- expected volatility

This is the core Layer-3 proposition: programmable product posture on top of a shared credit engine.

## Why This Matters for End Users

Current crypto yield products often blur risk boundaries and product intent.  
We think users need clearer categories and controls:

- **Savers** need transparent stability-oriented options
- **Retirees** need understandable liquidity and downside framing
- **Corporate treasuries** need policy-driven wrappers with explicit reserve and redemption logic

The long-term opportunity is not just "more yield." It is better financial product design with explicit tradeoff surfaces.

## Current Reality

This repository is an early-stage prototype and thesis demonstration:

- landing page and dashboard UX
- simulated mode analytics
- Solidity scaffolding for mode-specific vault contracts

It does not include live STRC feeds, custody rails, or production legal/compliance frameworks.

## Founder Video Walkthrough Outline

1. Explain the stack: Bitcoin -> STRC -> BaseYield
2. Explain why STRC is framed as digital credit
3. Demo Money Mode vs Yield Mode in the dashboard
4. Show reserve slider and simulated yield/liquidity tradeoffs
5. Close with roadmap and path from prototype to testnet and integration exploration
