// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/FixedIncomeNote.sol";

contract TestNoteProperties {
    FixedIncomeNote internal note;

    constructor() {
        note = new FixedIncomeNote();
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 800, DayCount.Convention.ACT_360);
    }

    function echidna_coupon_does_not_revert(uint256 notional, uint256 start, uint256 end) public {
        if (end < start) return;
        note.accrueCoupon(notional, start, end);
    }
}
