// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title DayCount
/// @notice Implements basic day-count conventions used for coupon accruals.
library DayCount {
    enum Convention {
        ACT_360,
        THIRTY_360
    }

    /// @notice Calculates the number of days between two timestamps.
    function dayCount(Convention convention, uint256 fromDate, uint256 toDate) internal pure returns (uint256) {
        require(toDate >= fromDate, "invalid range");
        if (convention == Convention.ACT_360) {
            return (toDate - fromDate) / 1 days;
        }

        // Simplified 30/360 US day count
        (uint256 y1, uint256 m1, uint256 d1) = _ymd(fromDate);
        (uint256 y2, uint256 m2, uint256 d2) = _ymd(toDate);
        if (d1 == 31) d1 = 30;
        if (d2 == 31 && d1 == 30) d2 = 30;
        return ((y2 - y1) * 360) + ((m2 - m1) * 30) + (d2 - d1);
    }

    function _ymd(uint256 timestamp) private pure returns (uint256 year, uint256 month, uint256 day) {
        uint256 z = timestamp / 1 days;
        uint256 era = (z >= 0 ? z : z - 146096) / 146097;
        uint256 doe = z - era * 146097;
        uint256 yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
        year = yoe + era * 400;
        uint256 doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
        uint256 mp = (5 * doy + 2) / 153;
        day = doy - (153 * mp + 2) / 5 + 1;
        month = mp + (mp < 10 ? 3 : -9);
        year += month <= 2 ? 1 : 0;
    }
}
