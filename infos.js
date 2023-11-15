// Assurez-vous d'avoir remplacé ces valeurs par les vôtres
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
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

const maxTickets = 10000; // Nombre maximal de tickets

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
          updateTicketsInfo();
          updatePlayersList();
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

function updateTicketsInfo() {
  lotteryContract.methods.getBalance().call()
    .then(balance => {
      let ticketsSold = web3.utils.fromWei(balance, 'ether') / 0.001;
      let ticketsRemaining = maxTickets - ticketsSold;
      document.getElementById('PurchasedTickets').innerText = `Tickets achetés : ${ticketsSold}`;
      document.getElementById('RemainingTickets').innerText = `Tickets restants : ${ticketsRemaining}`;
    })
    .catch(err => {
      console.error(err);
    });
}

function updatePlayersList() {
    lotteryContract.methods.getPlayers().call()
        .then(players => {
            let uniquePlayers = new Set(players); // Utiliser un Set pour filtrer les adresses uniques
            let playersList = Array.from(uniquePlayers).map(address => `<li>${truncateAddress(address)}</li>`).join('');
            document.getElementById('Player').innerHTML = `<ul>${playersList}</ul>`;
            document.getElementById('nbPlayers').innerText = uniquePlayers.size; // Afficher le nombre de joueurs uniques
        })
        .catch(err => {
            console.error(err);
        });
}


  function truncateAddress(address) {
	return address.substring(0, 20) + '...';
  }
  
  window.addEventListener('load', function() {
	// ... Reste du code d'initialisation ...
  
	ethereum.request({ method: 'eth_requestAccounts' })
	  .then(accounts => {
		if (accounts.length > 0) {
		  document.getElementById('User').innerText = truncateAddress(accounts[0]);
		  updateTicketsInfo();
		  updatePlayersList();
		} else {
		  console.log("Veuillez vous connecter à Metamask.");
		}
	  })
	  .catch(err => {
		  console.error(err);
	  });
  
	// ... Autres fonctions ...
  });

  function truncateUser(address) {
	return address.substring(0, 6) + '...';
  }
  
  window.addEventListener('load', function() {
	// ... Reste du code d'initialisation ...
  
	ethereum.request({ method: 'eth_requestAccounts' })
	  .then(accounts => {
		if (accounts.length > 0) {
		  document.getElementById('User').innerText = truncateUser(accounts[0]);
		  updateTicketsInfo();
		  updatePlayersList();
		} else {
		  console.log("Veuillez vous connecter à Metamask.");
		}
	  })
	  .catch(err => {
		  console.error(err);
	  });
  
	// ... Autres fonctions ...
  });

  