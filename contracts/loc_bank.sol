// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    mapping(address => string) private userNames;

    event FundsTransferred(uint256 amount);
    event NameChanged(string newName);

    function updateAccountName(string memory newName) public {
        require(
            keccak256(abi.encodePacked(userNames[msg.sender])) !=
                keccak256(abi.encodePacked(newName)),
            "The new name must differ from the current name."
        );
        userNames[msg.sender] = newName;
        emit NameChanged(newName);
    }

    function retrieveAccountName() public view returns (string memory) {
        return userNames[msg.sender];
    }

    error BalanceTooLow(uint256 available, uint256 requested);

    function sendFunds(address payable recipient) public payable {
        if (msg.sender.balance < msg.value) {
            revert BalanceTooLow({
                available: msg.sender.balance,
                requested: msg.value
            });
        }
        recipient.transfer(msg.value);
        emit FundsTransferred(msg.value);
    }

    function checkBalance() public view returns (uint256) {
        return msg.sender.balance;
    }
}
