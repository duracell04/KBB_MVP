// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../core/FixedIncomeNote.sol";

contract FixedIncomeNoteTest is Test {
    FixedIncomeNote internal note;

    function setUp() public {
        note = new FixedIncomeNote();
    }

    function testAccruesCoupon() public {
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 500, DayCount.Convention.ACT_360);
        vm.expectEmit(true, true, false, true);
        emit FixedIncomeNote.CouponAccrued(0, block.timestamp + 30 days);
        note.accrueCoupon(0, block.timestamp, block.timestamp + 30 days);
    }
}
