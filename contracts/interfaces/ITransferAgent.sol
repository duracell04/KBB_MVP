// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface ITransferAgent {
    struct FundingEvidence {
        uint256 amount;
        string currency;
        string settlementRef;
        string settlementNetwork;
        uint256 valueDate;
    }

    function settleSubscription(bytes32 orderId, address investor, FundingEvidence calldata evidence) external;
}
