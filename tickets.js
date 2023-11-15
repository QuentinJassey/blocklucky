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

let web3;
let lotteryContract;
window.addEventListener('load', function() {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    lotteryContract = new web3.eth.Contract(contractABI, contractAddress);

    ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          document.getElementById('User').innerText = accounts[0];
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

function buyTickets(numberOfTickets) {
    const ticketPrice = 0.001; // Prix d'un ticket
    const totalAmount = ticketPrice * numberOfTickets;

    ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            if (accounts.length === 0) {
                throw new Error("Aucun compte n'est connecté.");
            }

            lotteryContract.methods.enter()
                .send({ from: accounts[0], value: web3.utils.toWei(totalAmount.toString(), 'ether') })
                .then(tx => console.log(`Transaction réussie avec le hash : ${tx.transactionHash}`))
                .catch(error => console.error(error));
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des comptes :', error);
        });
}
  
  function truncateUser(address) {
	return address.substring(0, 6) + '...';
  }
  
  window.addEventListener('load', function() {
	// ... Reste du code d'initialisation ...
  
	ethereum.request({ method: 'eth_requestAccounts' })
	  .then(accounts => {
		if (accounts.length > 0) {
		  document.getElementById('User').innerText = truncateUser(accounts[0]);
		} else {
		  console.log("Veuillez vous connecter à Metamask.");
		}
	  })
	  .catch(err => {
		  console.error(err);
	  });
  
	// ... Autres fonctions ...
  });

  document.getElementById('enterLottery').addEventListener('click', function() {
    buyTickets(1);
  });
  
  document.getElementById('enterLottery10').addEventListener('click', function() {
    buyTickets(10);
  });
  
  document.getElementById('enterLottery20').addEventListener('click', function() {
    buyTickets(20);
  });