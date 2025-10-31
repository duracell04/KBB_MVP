// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "./AdminRoles.sol";
import "./DayCount.sol";

contract FixedIncomeNote is Initializable, AdminRoles {
    using DayCount for DayCount.Convention;

    IERC20 public cashToken;
    ITransferAgent public transferAgent;
    IRegistry public registry;

    uint256 public couponRateBps;
    DayCount.Convention public dayCountConvention;

    event CouponAccrued(uint256 amount, uint256 asOfDate);

    function initialize(
        address admin,
        IERC20 cashTokenAddress,
        ITransferAgent transferAgentAddress,
        IRegistry registryAddress,
        uint256 couponRateBpsValue,
        DayCount.Convention convention
    ) public virtual initializer {
        require(admin != address(0), "admin required");
        initializeAdminRoles(admin);
        _grantTransferAgent(address(transferAgentAddress));
        _grantPauser(admin);
        _grantUpgrader(admin);
        _grantIssuer(admin);

        cashToken = cashTokenAddress;
        transferAgent = transferAgentAddress;
        registry = registryAddress;
        couponRateBps = couponRateBpsValue;
        dayCountConvention = convention;
    }

    function accrueCoupon(uint256 notional, uint256 fromDate, uint256 toDate) external onlyIssuer {
        uint256 accrualDays = dayCountConvention.dayCount(fromDate, toDate);
        uint256 accrual = (notional * couponRateBps * accrualDays) / 36_000_000; // bps * days / 360
        emit CouponAccrued(accrual, toDate);
    }
}
