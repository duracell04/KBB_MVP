// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./IRegistry.sol";

contract BasicRegistry is IRegistry {
    address public admin;
    mapping(address => bool) public eligible;
    mapping(address => uint256) public locked;
    mapping(address => bytes32) public juris;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    function setEligibility(address investor, bool ok, uint256 lockUnix, bytes32 jurisdictionCode) external onlyAdmin {
        eligible[investor] = ok;
        locked[investor] = lockUnix;
        juris[investor] = jurisdictionCode;
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "admin req");
        admin = newAdmin;
    }

    function isEligible(address investor) external view override returns (bool) {
        if (!eligible[investor]) {
            return false;
        }
        return block.timestamp >= locked[investor];
    }

    function lockupUntil(address investor) external view override returns (uint256) {
        return locked[investor];
    }

    function jurisdiction(address investor) external view override returns (bytes32) {
        return juris[investor];
    }
}
