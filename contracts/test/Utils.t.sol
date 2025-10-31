// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../core/DayCount.sol";

contract UtilsTest is Test {
    function testAct360() public pure {
        uint256 start = 0;
        uint256 end = 30 days;
        uint256 daysCount = DayCount.dayCount(DayCount.Convention.ACT_360, start, end);
        assertEq(daysCount, 30);
    }
}
