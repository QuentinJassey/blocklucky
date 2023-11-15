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
          checkLotteryBalance();
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

// Fonction pour vérifier le solde de la loterie
function checkLotteryBalance() {
  lotteryContract.methods.getBalance().call()
    .then(balance => {
      document.getElementById('lotteryBalance').innerText = web3.utils.fromWei(balance, 'ether');
    })
    .catch(err => {
      console.error(err);
    });
}

function updateLotteryCountdown() {
    lotteryContract.methods.getDeadline().call()
        .then(deadline => {
            const currentTime = new Date().getTime() / 1000; // Temps actuel en secondes
            const timeLeft = deadline - currentTime; // Temps restant en secondes

            if (timeLeft < 0) {
                document.getElementById('Time').innerText = "La loterie est terminée";
                return;
            }

            const days = Math.floor(timeLeft / (24 * 60 * 60));
            const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
            const seconds = Math.floor(timeLeft % 60);

            document.getElementById('Time').innerText = `${days} jours, ${hours}: ${minutes}: ${seconds}`;
        })
        .catch(err => console.error(err));
}

// Mettre à jour le compte à rebours toutes les secondes
setInterval(updateLotteryCountdown, 1000);


function redirectToWinnerIfDeadlinePassed() {
    lotteryContract.methods.getDeadline().call()
        .then(deadline => {
            const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes Unix
            if (currentTime > deadline) {
                window.location.href = 'winner.html'; // Redirection vers la page du gagnant
            }
        })
        .catch(err => console.error('Erreur lors de la vérification de la deadline:', err));
}

// Vérifier la deadline toutes les 30 secondes
setInterval(redirectToWinnerIfDeadlinePassed, 1000);