// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title AdminRoles
/// @notice Provides role management for issuer-operated instruments.
abstract contract AdminRoles is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    function _grantIssuer(address account) internal {
        _grantRole(ISSUER_ROLE, account);
    }

    function _grantTransferAgent(address account) internal {
        _grantRole(TRANSFER_AGENT_ROLE, account);
    }

    function _grantPauser(address account) internal {
        _grantRole(PAUSER_ROLE, account);
    }

    function _grantUpgrader(address account) internal {
        _grantRole(UPGRADER_ROLE, account);
    }

    modifier onlyIssuer() {
        _checkRole(ISSUER_ROLE, msg.sender);
        _;
    }
}
