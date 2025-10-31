// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract UUPSUpgradeableNote is FixedIncomeNote, UUPSUpgradeable {
    function initialize(
        address admin,
        IERC20 cashTokenAddress,
        ITransferAgent transferAgentAddress,
        IRegistry registryAddress,
        uint256 couponRateBpsValue,
        DayCount.Convention convention
    ) public override initializer {
        FixedIncomeNote.initialize(admin, cashTokenAddress, transferAgentAddress, registryAddress, couponRateBpsValue, convention);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
