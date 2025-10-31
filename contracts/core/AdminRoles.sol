// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title AdminRoles (placeholder)
/// @notice Intention: centralize role identifiers (bytes32 constants) for issuer/admin operations.
/// @dev Why: Keeps role names canonical across contracts; later you can extend with OZ AccessControl.
library AdminRoles {
    // Example future roles:
    // bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    // bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");
    // bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    // bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
}
