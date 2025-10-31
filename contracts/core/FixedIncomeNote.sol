// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./DayCount.sol";

contract FixedIncomeNote {
    using DayCount for uint256;

    uint256 public couponRateBps; // e.g., 500 = 5.00% p.a.
    event CouponAccrued(uint256 notional, uint256 daysCount, uint256 amount, uint256 asOf);

    function initialize(uint256 rateBps) external {
        require(couponRateBps == 0, "init-once");
        couponRateBps = rateBps;
    }

    function accrueACT360(uint256 notional, uint256 fromTs, uint256 toTs) external {
        uint256 d = DayCount.daysACT360(fromTs, toTs);
        uint256 amt = (notional * couponRateBps * d) / 36_000_000; // bps * days / 360
        emit CouponAccrued(notional, d, amt, toTs);
    }
}
