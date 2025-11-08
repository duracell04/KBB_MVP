# Eligibility & registry seam

KBB enforces ERC-3643-style checks before minting or transferring notes. The on-chain registry encapsulates investor eligibility, lockups, and jurisdiction metadata so DvP orchestration can gate transfers deterministically.

## Interface

- [`contracts/registry/IRegistry.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/registry/IRegistry.sol) exposes `isEligible`, `lockupUntil`, and `jurisdiction` lookups.
- [`contracts/registry/BasicRegistry.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/registry/BasicRegistry.sol) stores admin-managed eligibility/lockup data.

## Usage example

```solidity
function demoRegistry(IRegistry registry, address investor) external view returns (bool eligible) {
    if (!registry.isEligible(investor)) {
        return false;
    }

    uint256 release = registry.lockupUntil(investor);
    bytes32 juris = registry.jurisdiction(investor);
    if (block.timestamp < release) {
        return false;
    }

    return juris != bytes32(0);
}
```

The orchestrator queries the registry before settle/transfer; if eligibility fails or lockup has not expired, the transaction reverts. Jurisdiction codes enable per-investor policy enforcement.
