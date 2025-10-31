// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library DayCount {
    function daysACT360(uint256 fromTs, uint256 toTs) internal pure returns (uint256) {
        require(toTs >= fromTs, "range");
        return (toTs - fromTs) / 1 days;
    }
}
