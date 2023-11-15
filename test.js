const contractABI = [
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLotteryId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRandomNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0x7b56238DAe573BF78d48E88325fFfF03A37f972D';

let contract;
let userAccount;

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        console.error("Ethereum wallet is not connected. Please install MetaMask.");
    }

    document.getElementById('connectWallet').onclick = connectWallet;
    document.getElementById('enterLottery').onclick = enterLottery;
    document.getElementById('enterLottery10').onclick = enterLottery10;
    document.getElementById('enterLottery20').onclick = enterLottery20;

    updateUI();
});

function connectWallet() {
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        userAccount = accounts[0];
        console.log(`Connected with account: ${userAccount}`);
        updateUI();
    })
    .catch(error => console.error(error));
}

function enterLottery() {
//     if (!userAccount) return alert("Please connect your wallet first.");

    contract.methods.enter().send({ from: userAccount, value: web3.utils.toWei('0.001', 'ether') })
    .then(() => updateUI())
    .catch(error => console.error(error));
}

function enterLottery10() {
    if (!userAccount) return alert("Please connect your wallet first.");

    contract.methods.enter().send({ from: userAccount, value: web3.utils.toWei('0.01', 'ether') })
    .then(() => updateUI())
    .catch(error => console.error(error));
}

function enterLottery20() {
    if (!userAccount) return alert("Please connect your wallet first.");

    contract.methods.enter().send({ from: userAccount, value: web3.utils.toWei('0.02', 'ether') })
    .then(() => updateUI())
    .catch(error => console.error(error));
}

function updateUI() {
    if (!userAccount) return;

    contract.methods.getLotteryId().call()
    .then(id => document.getElementById('lotteryId').innerText = id)
    .catch(error => console.error(error));

    contract.methods.getPlayers().call()
    .then(players => document.getElementById('numPlayers').innerText = players.length)
    .catch(error => console.error(error));

    contract.methods.getBalance().call()
    .then(balance => document.getElementById('lotteryBalance').innerText = web3.utils.fromWei(balance, 'ether'))
    .catch(error => console.error(error));

	displayPlayers();
}

function displayPlayers() {
    contract.methods.getPlayers().call()
    .then(players => {
        const playersList = document.getElementById('playersList');
        playersList.innerHTML = ''; // Clear existing list

        players.forEach(player => {
            let playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.innerText = player;
            playersList.appendChild(playerDiv);
        });
    })
    .catch(error => console.error(error));
}

function checkAccount() {
    web3.eth.getAccounts().then(accounts => {
        if (accounts.length === 0) {
            // Aucun compte n'est connecté
            userAccount = null;
            console.log("No connected account.");
        } else if (accounts[0] !== userAccount) {
            // Un nouveau compte est connecté ou le compte connecté a changé
            userAccount = accounts[0];
            console.log(`Connected with account: ${userAccount}`);
            updateUI();
        }
    }).catch(error => console.error(error));
}

// Vérification périodique de la connexion
setInterval(checkAccount, 1000); // Vérifie toutes les 1 seconde
