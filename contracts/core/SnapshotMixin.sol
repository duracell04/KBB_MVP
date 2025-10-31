// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/// @title SnapshotMixin
/// @notice Helper for record date snapshots using snapshot-capable tokens (e.g. OZ ERC20Snapshot).
abstract contract SnapshotMixin {
    uint256 public recordDate;
    uint256 public recordDateSnapshotId;
    uint256 public recordDateSupply;

    event RecordDateSnapshot(uint256 indexed recordDate, uint256 snapshotId, uint256 totalSupply);

    function _snapshot() internal virtual returns (uint256);

    function balanceOfAt(address account, uint256 snapshotId) public view virtual returns (uint256);

    function totalSupplyAt(uint256 snapshotId) public view virtual returns (uint256);

    function _snapshotRecordDate(uint256 recordDateTimestamp) internal returns (uint256) {
        require(recordDateSnapshotId == 0, "snapshot taken");
        require(recordDateTimestamp != 0, "record date required");
        recordDate = recordDateTimestamp;
        uint256 snapshotId = _snapshot();
        recordDateSnapshotId = snapshotId;
        recordDateSupply = totalSupplyAt(snapshotId);
        emit RecordDateSnapshot(recordDateTimestamp, snapshotId, recordDateSupply);
        return snapshotId;
    }

    function hasRecordDateSnapshot() public view returns (bool) {
        return recordDateSnapshotId != 0;
    }

    function recordDateBalanceOf(address account) public view returns (uint256) {
        require(recordDateSnapshotId != 0, "snapshot missing");
        return balanceOfAt(account, recordDateSnapshotId);
    }

    function _proRataCoupon(address account, uint256 grossAmount) internal view returns (uint256) {
        require(recordDateSupply > 0, "record supply zero");
        return (recordDateBalanceOf(account) * grossAmount) / recordDateSupply;
    }
}
