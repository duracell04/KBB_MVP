// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract KBBProxyAdmin is ProxyAdmin {
    /// @notice Pass the desired owner to the OZ ProxyAdmin constructor (v5+)
    constructor(address initialOwner) ProxyAdmin(initialOwner) {}
}
