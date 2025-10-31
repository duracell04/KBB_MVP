// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract FixedIncomeNoteTest is Test {
    FixedIncomeNote internal note;

    function setUp() public { note = new FixedIncomeNote(); }

    function testAccrualMath() public {
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 500, DayCount.Convention.ACT_360);
        uint256 notional = 1_000_000e6;
        uint256 fromDate = block.timestamp;
        uint256 toDate = fromDate + 30 days;
        uint256 d = DayCount.dayCount(DayCount.Convention.ACT_360, fromDate, toDate);
        uint256 expected = (notional * 500 * d) / 36_000_000;

        vm.expectEmit(true, true, false, true);
        emit FixedIncomeNote.CouponAccrued(expected, toDate);
        note.accrueCoupon(notional, fromDate, toDate);
    }
}
