// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../core/FixedIncomeNote.sol";

/// @title UUPSUpgradeableNote
/// @notice Wraps the FixedIncomeNote with UUPS upgrade hooks.
contract UUPSUpgradeableNote is FixedIncomeNote, UUPSUpgradeable {
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
