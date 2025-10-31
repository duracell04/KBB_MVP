// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title FixedIncomeNote (placeholder)
/// @notice Intention: ERC-20-like, permissioned note with coupon schedule and DvP-only issuance.
/// @dev Why: Represents the "token-registered" instrument; transfer hooks will enforce compliance.
contract FixedIncomeNote {
    // Placeholder storage, events, and functions go here.
    // In implementation:
    // - Track couponRateBps, dayCountConvention, schedule
    // - Enforce whitelist/lockups on transfer
    // - Emit events for SubscriptionSettled, CouponPaid, RedemptionPaid
}
