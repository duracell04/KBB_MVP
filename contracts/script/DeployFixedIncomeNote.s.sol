// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract DeployFixedIncomeNoteScript is Script {
    function run() external {
        address admin = vm.envAddress("ADMIN_ADDRESS");
        IERC20 cashToken = IERC20(vm.envAddress("CASH_TOKEN"));
        ITransferAgent transferAgent = ITransferAgent(vm.envAddress("TRANSFER_AGENT"));
        IRegistry registry = IRegistry(vm.envAddress("REGISTRY"));
        uint256 couponRateBps = vm.envUint("COUPON_RATE_BPS");

        vm.startBroadcast();
        FixedIncomeNote note = new FixedIncomeNote();
        note.initialize(admin, cashToken, transferAgent, registry, couponRateBps, DayCount.Convention.ACT_360);
        vm.stopBroadcast();
    }
}
