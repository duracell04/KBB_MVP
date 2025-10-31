// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../contracts/core/FixedIncomeNote.sol";

contract FixedIncomeNoteTest is Test {
    FixedIncomeNote note;

    function setUp() public {
        note = new FixedIncomeNote();
        note.initialize(500); // 5.00% p.a.
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
}
