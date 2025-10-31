// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../contracts/core/SnapshotMixin.sol";

contract MockSnapshotNote is SnapshotMixin {
    mapping(address => uint256) public balances;
    mapping(uint256 => mapping(address => uint256)) private snapshotBalances;
    mapping(uint256 => uint256) private snapshotSupply;
    address[] private holders;
    mapping(address => bool) private tracked;
    uint256 private totalSupply_;
    uint256 private currentSnapshotId;

    function mint(address to, uint256 amount) external {
        balances[to] += amount;
        totalSupply_ += amount;
        if (!tracked[to]) {
            tracked[to] = true;
            holders.push(to);
        }
    }

    function transfer(address from, address to, uint256 amount) external {
        require(balances[from] >= amount, "insufficient");
        balances[from] -= amount;
        balances[to] += amount;
        if (!tracked[to]) {
            tracked[to] = true;
            holders.push(to);
        }
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function _snapshot() internal override returns (uint256) {
        currentSnapshotId += 1;
        uint256 id = currentSnapshotId;
        for (uint256 i = 0; i < holders.length; i++) {
            address holder = holders[i];
            snapshotBalances[id][holder] = balances[holder];
        }
        snapshotSupply[id] = totalSupply_;
        return id;
    }

    function balanceOfAt(address account, uint256 snapshotId) public view override returns (uint256) {
        return snapshotBalances[snapshotId][account];
    }

    function totalSupplyAt(uint256 snapshotId) public view override returns (uint256) {
        return snapshotSupply[snapshotId];
    }

    function takeSnapshot(uint256 recordDateTimestamp) external returns (uint256) {
        return _snapshotRecordDate(recordDateTimestamp);
    }

    function couponShare(address account, uint256 grossAmount) external view returns (uint256) {
        return _proRataCoupon(account, grossAmount);
    }
}

contract SnapshotRecordDateTest is Test {
    MockSnapshotNote internal note;
    address internal alice = address(0xA11CE);
    address internal bob = address(0xB0B);

    function setUp() public {
        note = new MockSnapshotNote();
        note.mint(alice, 100);
        note.mint(bob, 300);
    }

    function testSnapshotLocksBalancesForProRataCoupons() public {
        uint256 snapshotId = note.takeSnapshot(1_700_000_000);
        assertEq(snapshotId, 1);
        assertEq(note.recordDateSupply(), 400);

        note.transfer(bob, alice, 150);

        uint256 coupon = 4000;
        uint256 aliceShare = note.couponShare(alice, coupon);
        uint256 bobShare = note.couponShare(bob, coupon);

        assertEq(aliceShare, (coupon * 100) / 400);
        assertEq(bobShare, (coupon * 300) / 400);
        assertEq(aliceShare + bobShare, coupon);
    }

    function testSnapshotOnlyOnce() public {
        note.takeSnapshot(1_700_000_000);
        vm.expectRevert(bytes("snapshot taken"));
        note.takeSnapshot(1_700_000_100);
    }
}
