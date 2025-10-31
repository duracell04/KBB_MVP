// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title IRegistry (placeholder)
/// @notice Intention: abstract identity/whitelist registry (e.g., ERC-3643 / ONCHAINID adapter).
/// @dev Why: Allows swapping compliance providers without changing the note contract.
interface IRegistry {
    // function isEligible(address holder) external view returns (bool);
    // function lockupEndsAt(address holder) external view returns (uint256);
}
