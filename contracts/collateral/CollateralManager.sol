// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CollateralManager {
    address public admin;

    event CollateralLocked(
        string collateralId,
        string ctype,
        uint256 value,
        string currency,
        string valuationDate,
        string custodian,
        string settlementRef,
        string settlementNetwork
    );

    event CollateralReleased(string collateralId, string reason);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    function lockCollateral(
        string memory collateralId,
        string memory ctype,
        uint256 value,
        string memory currency,
        string memory valuationDate,
        string memory custodian,
        string memory settlementRef,
        string memory settlementNetwork
    ) external onlyAdmin {
        emit CollateralLocked(
            collateralId,
            ctype,
            value,
            currency,
            valuationDate,
            custodian,
            settlementRef,
            settlementNetwork
        );
    }

    function releaseCollateral(
        string memory collateralId,
        string memory reason
    ) external onlyAdmin {
        emit CollateralReleased(collateralId, reason);
    }
}
