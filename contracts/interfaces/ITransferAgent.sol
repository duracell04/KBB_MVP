// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title ITransferAgent (placeholder)
/// @notice Intention: off-chain orchestrator (DvP) calls into note via this agent to mint/transfer.
/// @dev Why: Keeps the token core small; all compliance & funding checks happen here first.
interface ITransferAgent {
    // function settleSubscription(bytes32 orderId, address investor, uint256 amount, bytes calldata proof) external;
    // function refund(bytes32 orderId) external;
}
