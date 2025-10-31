// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IRegistry {
    function isEligible(address investor) external view returns (bool);
    function lockupUntil(address investor) external view returns (uint256);
    function jurisdiction(address investor) external view returns (bytes32);
}
