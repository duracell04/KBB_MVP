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

    function setUp() public {
        note = new FixedIncomeNote();
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 1000, DayCount.Convention.ACT_360);
    }

    function invariantCouponNeverNegative(uint256 notional, uint256 start, uint256 end) public {
        vm.assume(end >= start);
        note.accrueCoupon(notional, start, end);
    }
}
