// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract Invariants is Test {
    FixedIncomeNote internal note;
    uint256 internal constant DEFAULT_NOTIONAL = 1_000_000e6;
    uint256 internal constant DEFAULT_DURATION = 30 days;

    function setUp() public {
        note = new FixedIncomeNote();
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 1000, DayCount.Convention.ACT_360);
    }

    function invariantCouponRateRemainsConfigured() public {
        assertEq(note.couponRateBps(), 1000);
    }

    function invariantAccrualDoesNotRevertForDefaultScenario() public {
        uint256 start = block.timestamp;
        uint256 end = start + DEFAULT_DURATION;
        uint256 accrualDays = DayCount.dayCount(DayCount.Convention.ACT_360, start, end);
        uint256 expectedAccrual = (DEFAULT_NOTIONAL * note.couponRateBps() * accrualDays) / 36_000_000;

        // Invariant ensures deterministic accrual and no reverts for a baseline scenario
        assertGt(expectedAccrual, 0);
        note.accrueCoupon(DEFAULT_NOTIONAL, start, end);
    }
}
