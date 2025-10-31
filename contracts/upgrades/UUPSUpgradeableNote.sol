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
        address _admin,
        IERC20 _cashToken,
        ITransferAgent _transferAgent,
        IRegistry _registry,
        uint256 _couponRateBps,
        DayCount.Convention _convention
    ) public override initializer {
        FixedIncomeNote.initialize(_admin, _cashToken, _transferAgent, _registry, _couponRateBps, _convention);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
