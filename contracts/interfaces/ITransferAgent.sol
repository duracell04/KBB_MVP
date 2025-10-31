// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ITransferAgent
/// @notice Interface for ERC-3643 transfer control agent integration.
interface ITransferAgent {
    function enforceTransfer(address from, address to, uint256 amount) external returns (bool);
}
