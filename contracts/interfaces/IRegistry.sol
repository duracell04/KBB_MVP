// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IRegistry
/// @notice Minimal identity registry for ERC-3643 compliance checks.
interface IRegistry {
    function isVerified(address account) external view returns (bool);
}
