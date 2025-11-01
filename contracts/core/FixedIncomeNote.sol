// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./DayCount.sol";
import "../registry/IRegistry.sol";
import "../interfaces/ITransferAgent.sol";

contract FixedIncomeNote {

    address public admin;
    IRegistry public registry;
    ITransferAgent public transferAgent;
    uint256 public couponRateBps; // e.g., 500 = 5.00% p.a.

    event CouponAccrued(uint256 notional, uint256 daysCount, uint256 amount, uint256 asOf);
    event SubscriptionSettled(
        bytes32 indexed orderId,
        address indexed investor,
        uint256 amount,
        string currency,
        string settlementRef,
        string settlementNetwork
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    modifier onlyTransferAgent() {
        require(address(transferAgent) != address(0), "agent not set");
        require(msg.sender == address(transferAgent), "not agent");
        _;
    }

    function initialize(
        address admin_,
        IRegistry registry_,
        ITransferAgent transferAgent_,
        uint256 rateBps
    ) external {
        require(admin == address(0), "init-once");
        require(admin_ != address(0), "admin required");
        admin = admin_;
        registry = registry_;
        transferAgent = transferAgent_;
        couponRateBps = rateBps;
    }

    function setRegistry(IRegistry newRegistry) external onlyAdmin {
        registry = newRegistry;
    }

    function setTransferAgent(ITransferAgent newTransferAgent) external onlyAdmin {
        transferAgent = newTransferAgent;
    }

    function accrueACT360(uint256 notional, uint256 fromTs, uint256 toTs) external {
        require(couponRateBps != 0, "rate not set");
        uint256 d = DayCount.daysACT360(fromTs, toTs);
        uint256 amt = (notional * couponRateBps * d) / 36_000_000; // bps * days / 360
        emit CouponAccrued(notional, d, amt, toTs);
    }

    function settleSubscription(bytes32 orderId, address investor, ITransferAgent.FundingEvidence calldata evidence)
        external
        onlyTransferAgent
    {
        require(address(registry) != address(0), "registry not set");
        require(registry.isEligible(investor), "ineligible");
        emit SubscriptionSettled(orderId, investor, evidence.amount, evidence.currency, evidence.settlementRef, evidence.settlementNetwork);
    }
}
