let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let abi = null;
let bankContract = null;

let content = document.getElementById("content");
let connectBtn = document.getElementById("connect-btn");
let address = document.getElementById("account");
let accountName = document.getElementById("account-name");
let accountBalance = document.getElementById("balance");
let receiver = document.getElementById("receiver");
let amount = document.getElementById("amount");
let confirmTransferBtn = document.getElementById("confirm-transfer-btn");
let nameInput = document.getElementById('input-name');
let confirmNameButton = document.getElementById("confirm-name-btn");

confirmTransferBtn.addEventListener("click", () => executeTransfer());
confirmNameButton.addEventListener('click', () => changeName());

let isConnected = false;

if (!isConnected) {
    concealContent();
    loadABI();
    attemptConnection();

} else {
    showError("Please connect to MetaMask", true);
}

function attemptConnection() {
    if (window.ethereum && window.ethereum.isMetaMask) {
        isConnected = true;
        connectBtn.addEventListener("click", () => connectToWallet());
    } else {
        showError("MetaMask is required for this functionality!", true);
    }
}

async function connectToWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        bankContract = initializeContract();
        refreshContent(accounts[0]);
    } catch (error) {
        showError("Failed to connect to MetaMask", true, error);
    }
}

function initializeContract() {
    if (window.ethereum && window.ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, abi, signer);
    }
}

async function refreshContent(account) {
    address.textContent = account;
    try {
        const balance = await bankContract.getBalance();
        const name = await bankContract.getAccountName();
        accountBalance.textContent = ethers.utils.formatEther(balance);
        accountName.textContent = name || "User";
        revealContent();
    } catch (error) {
        showError("Unable to access contract data. Please try again later.", true, error);
    }
}

function showError(message = null, display, error = null) {
    console.error(error || message);
    isConnected = false;
    content.textContent = display ? message : "An error occurred. Please try again later.";
    revealErrorContent();
}

function revealContent() {
    content.classList.remove("hide");
    connectBtn.classList.add("disable");
    connectBtn.textContent = "Connected";
    connectBtn.disabled = true;

    if (window.ethereum) {
        window.ethereum.on('transactionHash', () => {
            refreshContent(address.innerText);
        });
        window.ethereum.on('accountsChanged', () => {
            window.location.reload();
        });
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
}

function revealErrorContent() {
    content.classList.remove("hide");
    connectBtn.classList.add("disable");
    connectBtn.textContent = "ERROR!!";
    connectBtn.disabled = true;

    if (window.ethereum) {
        window.ethereum.on('transactionHash', () => {
            refreshContent(address.innerText);
        });
        window.ethereum.on('accountsChanged', () => {
            window.location.reload();
        });
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
}

function concealContent() {
    content.classList.add("hide");
    connectBtn.classList.remove("disable");
    connectBtn.textContent = "Connect your Wallet";
    connectBtn.disabled = false;
}

function loadABI() {
    fetch("http://localhost:3000/artifacts/contracts/Bank.sol/Bank.json")
        .then((response) => response.json())
        .then((data) => {
            abi = data.abi;
        })
        .catch((error) => {
            showError("Unable to load ABI", false, error);
        });
}

async function executeTransfer() {
    const receiverAddress = receiver.value.trim();
    const amountValue = ethers.utils.parseEther(amount.value.trim());

    if (receiverAddress && amountValue) {
        try {
            const contract = initializeContract();
            const tx = await contract.transferFunds(receiverAddress, { value: amountValue });
            console.log(tx);
            contract.on("Transfer", (value) => {
                refreshContent(address.innerText);
                console.log("Transaction successful. Amount: ", value);
            });
        } catch (error) {
            showError("Transfer failed", true, error);
        }
    } else {
        showError("Please complete all fields", true);
    }
    closeModals();
}

async function changeName() {
    const newName = nameInput.value.trim();
    if (newName) {
        try {
            const contract = initializeContract();
            await contract.setAccountName(newName);
            contract.on("NameUpdate", () => {
                refreshContent(address.innerText);
            });
        } catch (error) {
            showError("The new name is identical to the current one! Please refresh.", true, error);
        }
    } else {
        showError("Please enter a name", true);
    }
    closeModals();
}

function closeModals() {
    document.getElementById('closeTransfer').click();
    document.getElementById('closeName').click();
}

if (window.ethereum) {
    window.ethereum.on('transactionHash', () => {
        refreshContent(address.innerText);
    });
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    });
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}
