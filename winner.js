// Assurez-vous d'avoir remplacé ces valeurs par les vôtres
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
		"name": "deadline",
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
		"name": "getDeadline",
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
]; // Remplacez par votre ABI
const contractAddress = '0x7b56238DAe573BF78d48E88325fFfF03A37f972D'; // Remplacez par l'adresse de votre contrat

// Initialisation de Web3
let web3;
let lotteryContract;
window.addEventListener('load', function() {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    lotteryContract = new web3.eth.Contract(contractABI, contractAddress);

    // Demander à l'utilisateur de se connecter à Metamask
    ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          return
        } else {
          console.log("Veuillez vous connecter à Metamask.");
        }
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.log("Veuillez installer Metamask.");
  }
});


window.addEventListener('load', function() {
    lotteryContract.methods.getWinners().call()
        .then(winners => {
            if (winners.length > 0) {
                const lastWinner = winners[winners.length - 1];
                document.getElementById('winnerName').innerText = truncateAddress(lastWinner);
            } else {
                document.getElementById('winnerName').innerText = "Pas encore de gagnant.";
                checkDeadlineAndPickWinner();
            }
        })
        .catch(err => console.error(err));
});

function truncateAddress(address) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}


let connectedAccount = null;

ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        if (accounts.length > 0) {
            connectedAccount = accounts[0]; // Stocker l'adresse du compte connecté
        } else {
            console.log("Veuillez vous connecter à Metamask.");
        }
    })
    .catch(err => {
        console.error(err);
    });


function checkDeadlineAndPickWinner() {
    lotteryContract.methods.getDeadline().call()
        .then(deadline => {
            const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes Unix
            if (currentTime >= deadline) {
                lotteryContract.methods.pickWinner().send({ from: connectedAccount })
                    .then(receipt => console.log('Le gagnant a été sélectionné:', receipt))
                    .catch(error => console.error('Erreur lors de la sélection du gagnant:', error));
            }
        })
        .catch(err => console.error('Erreur lors de la vérification de la deadline:', err));
}

// Vérifier la deadline toutes les 30 secondes, par exemple
