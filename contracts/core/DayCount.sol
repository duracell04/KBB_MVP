// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title DayCount (placeholder)
/// @notice Intention: house day-count conventions (ACT/360, 30/360, etc.) used in coupon accrual.
/// @dev Why: Isolate financial math for unit/invariant tests; plug-in alternative conventions later.
library DayCount {
    enum Convention { ACT_360, THIRTY_360 }
    // Placeholder only; add functions in implementation phase.
}
