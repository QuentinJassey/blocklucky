// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Lottery {
    address public owner;
    address payable[] public players;
    address[] public winners;
    uint public lotteryId;
    uint public deadline; // Ajout d'une variable pour la deadline

    constructor() {
        owner = msg.sender;
        lotteryId = 0;
        deadline = block.timestamp + 1 days; // Initialisation de la deadline à 7 jours après le déploiement
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value >= 1 wei);
        require(block.timestamp < deadline, "La loterie est terminee"); // Vérification de la deadline

        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function getLotteryId() public view returns(uint) {
        return lotteryId;
    }

    function getDeadline() public view returns(uint) {
    return deadline;
    }


    function pickWinner() public onlyOwner {
        require(block.timestamp >= deadline, "La loterie n'est pas encore terminee"); // Vérification de la deadline
        uint randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        lotteryId++;

        players = new address payable[](0); // Réinitialisation de la liste des joueurs
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
