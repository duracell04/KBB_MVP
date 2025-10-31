// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../contracts/core/FixedIncomeNote.sol";
import "../contracts/registry/BasicRegistry.sol";
import "../contracts/interfaces/ITransferAgent.sol";

contract FixedIncomeNoteTest is Test {
    FixedIncomeNote note;
    BasicRegistry registry;
    address transferAgent;

    function setUp() public {
        note = new FixedIncomeNote();
        registry = new BasicRegistry();
        transferAgent = address(this);
        note.initialize(address(this), registry, ITransferAgent(transferAgent), 500); // 5.00% p.a.
    }

    function testAccrual30DaysEmitsExpectedAmount() public {
        uint256 N = 1_000_000e6; // 1,000,000 (6 decimals example)
        uint256 fromTs = block.timestamp;
        uint256 toTs = fromTs + 30 days;
        uint256 expected = (N * 500 * 30) / 36_000_000;

        vm.expectEmit(true, true, true, true);
        emit FixedIncomeNote.CouponAccrued(N, 30, expected, toTs);

        note.accrueACT360(N, fromTs, toTs);
    }

    function testSettleSubscriptionRequiresEligibility() public {
        bytes32 orderId = keccak256("order-1");
        address investor = address(0xBEEF);
        ITransferAgent.FundingEvidence memory ev = ITransferAgent.FundingEvidence({
            amount: 1_000_000,
            currency: "USD",
            settlementRef: "UETR-1",
            settlementNetwork: "SWIFT",
            valueDate: block.timestamp
        });

        vm.expectRevert("ineligible");
        note.settleSubscription(orderId, investor, ev);

        registry.setEligibility(investor, true, 0, bytes32("US"));

        vm.expectEmit(true, true, true, true);
        emit FixedIncomeNote.SubscriptionSettled(orderId, investor, ev.amount, ev.currency, ev.settlementRef, ev.settlementNetwork);
        note.settleSubscription(orderId, investor, ev);
    }
}
