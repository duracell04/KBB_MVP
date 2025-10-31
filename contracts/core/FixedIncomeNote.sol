// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "./AdminRoles.sol";
import "./DayCount.sol";

/// @title FixedIncomeNote
/// @notice MVP fixed-income instrument compatible with ERC-3643 controls.
contract FixedIncomeNote is Initializable, AdminRoles {
    using DayCount for DayCount.Convention;

    IERC20 public cashToken;
    ITransferAgent public transferAgent;
    IRegistry public registry;

    uint256 public couponRateBps;
    DayCount.Convention public dayCountConvention;

    event CouponAccrued(uint256 amount, uint256 asOfDate);

    /// @notice Initializes the note.
    /// @param _admin Address that receives issuer and admin roles.
    /// @param _cashToken ERC-20 token used for coupons and principal.
    /// @param _transferAgent Transfer agent enforcing ERC-3643 controls.
    /// @param _registry Identity registry compatible with ERC-3643.
    /// @param _couponRateBps Annual coupon rate in basis points.
    /// @param _convention Day count convention to use for accruals.
    function initialize(
        address _admin,
        IERC20 _cashToken,
        ITransferAgent _transferAgent,
        IRegistry _registry,
        uint256 _couponRateBps,
        DayCount.Convention _convention
    ) external initializer {
        require(_admin != address(0), "admin required");
        _grantIssuer(_admin);
        _grantTransferAgent(address(_transferAgent));
        _grantPauser(_admin);
        _grantUpgrader(_admin);

        cashToken = _cashToken;
        transferAgent = _transferAgent;
        registry = _registry;
        couponRateBps = _couponRateBps;
        dayCountConvention = _convention;
    }

    /// @notice Example accrual function for documentation purposes.
    /// @dev Placeholder that emits events instead of moving funds.
    function accrueCoupon(uint256 notional, uint256 fromDate, uint256 toDate) external onlyIssuer {
        uint256 accrualDays = dayCountConvention.dayCount(fromDate, toDate);
        uint256 accrual = (notional * couponRateBps * accrualDays) / 36_000_000; // bps * days / 360
        emit CouponAccrued(accrual, toDate);
    }
}
