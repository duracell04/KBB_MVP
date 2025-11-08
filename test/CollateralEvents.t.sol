// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../contracts/collateral/CollateralManager.sol";

contract CollateralEventsTest is Test {
    CollateralManager internal manager;

    function setUp() public {
        manager = new CollateralManager();
    }

    function testLockEmit() public {
        vm.expectEmit(true, false, false, true);
        emit CollateralManager.CollateralLocked(
            "COLL-1",
            "INVENTORY",
            250_000,
            "USD",
            "2026-01-15",
            "EscrowCo",
            "2026-01-15/MsgId:ABC123",
            "ISO20022"
        );

        manager.lockCollateral(
            "COLL-1",
            "INVENTORY",
            250_000,
            "USD",
            "2026-01-15",
            "EscrowCo",
            "2026-01-15/MsgId:ABC123",
            "ISO20022"
        );
    }

    function testReleaseEmit() public {
        vm.expectEmit(true, false, false, true);
        emit CollateralManager.CollateralReleased("COLL-1", "loan repaid");

        manager.releaseCollateral("COLL-1", "loan repaid");
    }
}
