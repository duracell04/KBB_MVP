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
        address _admin,
        IERC20 _cashToken,
        ITransferAgent _transferAgent,
        IRegistry _registry,
        uint256 _couponRateBps,
        DayCount.Convention _convention
    ) public virtual initializer {
        require(_admin != address(0), "admin required");
        __AdminRoles_init(_admin);
        _grantTransferAgent(address(_transferAgent));
        _grantPauser(_admin);
        _grantUpgrader(_admin);
        _grantIssuer(_admin);

        cashToken = _cashToken;
        transferAgent = _transferAgent;
        registry = _registry;
        couponRateBps = _couponRateBps;
        dayCountConvention = _convention;
    }

    function accrueCoupon(uint256 notional, uint256 fromDate, uint256 toDate) external onlyIssuer {
        uint256 d = dayCountConvention.dayCount(fromDate, toDate);
        uint256 accrual = (notional * couponRateBps * d) / 36_000_000; // bps * days / 360
        emit CouponAccrued(accrual, toDate);
    }
}
