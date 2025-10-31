// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITransferAgent {
    function enforceTransfer(address from, address to, uint256 amount) external returns (bool);
}
