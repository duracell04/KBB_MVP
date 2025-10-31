// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title UUPSUpgradeableNote (placeholder)
/// @notice Intention: wrap the note with UUPS upgradeability and an authorizeUpgrade guard.
/// @dev Why: Separates upgrade/auth surface for auditor clarity.
abstract contract UUPSUpgradeableNote {
    // function _authorizeUpgrade(address newImpl) internal virtual view {}
}
