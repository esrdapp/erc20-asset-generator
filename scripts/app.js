var web3,
    provider,
    isMainNetwork,
    isHpb,
    isMetaMaskLocked,
    address;

// abi of StandardToken.sol
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_addedValue",
                "type": "uint256[]"
            }
        ],
        "name": "multiIncreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_value",
                "type": "uint256[]"
            }
        ],
        "name": "multiApprove",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "standard",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256[]"
            }
        ],
        "name": "multiDecreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "decimalUnits",
                "type": "uint8"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

// bytecode of StandardToken.sol
var bytecode = '608060405234801561001057600080fd5b50610417806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461005c57806370a0823114610087578063a9059cbb146100de575b600080fd5b34801561006857600080fd5b50610071610143565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100c8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061014d565b6040518082815260200191505060405180910390f35b3480156100ea57600080fd5b50610129600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610195565b604051808215151515815260200191505060405180910390f35b6000600154905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156101d257600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561021f57600080fd5b610270826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546103b490919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610303826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546103cd90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60008282111515156103c257fe5b818303905092915050565b60008082840190508381101515156103e157fe5b80915050929150505600a165627a7a723058208739085657e1bf7bc6c3d06d5577c7409d264c190e8cc6b7eb0b065cd4827cfe0029';

var metamaskStatus = $('#metamask-status');
var accountAddress = $('#current-address');
var currentNetwork = $('#current-network');
var metamaskLocked = $('#metamask-locked');
var metamaskUnlocked = $('#metamask-unlocked');

var assetForm = $('#asset-form');
var assetFormInput = $('#asset-form :input');
//disable all form input fields
assetFormInput.prop("disabled", true);

window.addEventListener('load', async () => {
    // New ethereum provider
    if (window.ethereum) {
        console.log("New ethereum provider detected");
        // Instance web3 with the provided information
        web3 = new Web3(window.ethereum);
        // ask user for permission
        metamaskStatus
            .html('Please allow MetaMask to view your addresses')
            .css({
                "text-align": "center",
                "color": "#0000ff"
            })
            .show();
        window.ethereum.enable().then(function (abc) {
            // user approved permission
            console.log("abc ===>", abc)
            start()
        }).catch(function (error) {
            metamaskStatus.css({ "color": "#ff0000" })
            // user rejected permission
            if (error.code == 4001) {
                metamaskStatus.html('You reject the permission request, Please refresh to try again');
                console.log("User rejected the permission request.");
            } else if (error.code == -32002) {
                metamaskStatus.html("Metamask permission request is already pending</br>Open Metamask to allow")
                    .css({ "color": "#ffa500" });
            } else {
                metamaskStatus.html(error.message);
                console.error("Error while try to connect with Metamask", error);
            }
        });
    }
    // Old web3 provider
    else if (web3 && Object.keys(web3).length) {
        console.log("Old web3 provider detected");
        start()
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected || web3 not exits');
        metamaskStatus.html('You do not appear to be connected to the HPB network. To use this service and deploy your contract, we recommend using the <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> plugin for Google Chrome, which allows your web browser to connect to the HPB network.').show();
    }
});

function handleAccountsChanged(accounts) {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
}

function handleChainChanged(_chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
}

function metamaskEvents() {
    ethereum.on('accountsChanged', handleAccountsChanged)
        .on('chainChanged', handleChainChanged)
        .on('connect', function (a, b, c) {
            debugger;
        })
        .on('disconnect', function (a, b, c) {
            debugger;
        })
        .on('message', function (a, b, c) {
            debugger;
        });
}

function start() {
    provider = web3.currentProvider;
    assetFormInput.prop("disabled", false);
    metamaskStatus.hide()
    // metamaskEvents()
    getEthNetworkId()
        .then(function (networkId) {
            if (networkId === '1') {
                isMainNetwork = true;
                currentNetwork.text('You are currently at Mainnet').show();
            } else if (networkId === '269') {
                isHpb = true;
                currentNetwork.text('Your are currently at HPB Network.').show();
            } else
                currentNetwork.text('Your current network id is ' + networkId).show();
        })
        .fail(function (err) {
            console.log(err)
        });

    setInterval(function () {
        isLocked()
            .then(function (isLocked) {
                if (isLocked) {
                    isMetaMaskLocked = true;
                    metamaskUnlocked.hide();
                    accountAddress.hide();
                    metamaskLocked.show();
                    assetFormInput.prop("disabled", true);
                    throw Error("Metamask Locked");
                }
                metamaskUnlocked.show();
                metamaskLocked.hide();

                return getAccount()
            })
            .then(function (account) {
                if (account.length > 0) {
                    if (isMetaMaskLocked) {
                        isMetaMaskLocked = false;
                        assetFormInput.prop("disabled", false);
                    }
                    address = account[0];
                    return getBalance(account[0]);
                }
            })
            .then(function (balance) {
                accountAddress.html('<strong>Selected Account: ' + address + ' (' + balance + ' hpb)</strong>').show();
            })
            .fail(function (err) {
                if (err.message !== "Metamask Locked")
                    console.log(err)
            });
    }, 1000);
}

function sendSync(params) {
    var defer = $.Deferred();
    provider.sendAsync(params, function (err, result) {
        if (err)
            return defer.reject(err.json());
        if (result['error'])
            return defer.reject(result['error']);
        defer.resolve(result)
    }
    );
    return defer.promise();
}

function getEthNetworkId() {
    return sendSync({ method: 'net_version', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err
        })
}

function requestAccounts() {
    return sendSync({ method: 'eth_requestAccounts' })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getAccount() {
    return sendSync({ method: 'eth_accounts', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getBalance(address) {
    return sendSync({ method: 'eth_getBalance', params: [address] })
        .then(function (result) {
            return web3.utils.fromWei(result['result']);
        })
        .fail(function (err) {
            return err;
        })
}

function isLocked() {
    return getAccount()
        .then(function (accounts) {
            return accounts.length <= 0;
        })
        .fail(function (err) {
            return err
        });
}

//call function on form submit
assetForm.submit(function (e) {

    //prevent the form from actually submitting.
    e.preventDefault();

    var initialSupply = $('#total-supply').val();
    var tokenName = $('#name').val();
    var decimalUnits = $('#decimals').val();
    var tokenSymbol = $('#symbol').val();


    if (tokenName === '') {
        alert('name can\'t be blank')
    } else if (tokenSymbol === '') {
        alert('symbol can\'t be blank')
    } else if (decimalUnits === '') {
        alert('decimals can\'t be blank')
    } else if (initialSupply === '') {
        alert('totalSupply can\'t be blank')
    } else {
        //disable all form input fields
        assetFormInput.prop("disabled", true);
        statusText.innerHTML = 'Waiting for contract to be deployed...';
        var standardtokenContract = new web3.eth.Contract(abi);
        standardtokenContract.deploy({
            data: '0x' + bytecode,
            arguments: [initialSupply, tokenName, decimalUnits, tokenSymbol]
        }).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error);
                assetFormInput.prop("disabled", false);
                return;
            }
            console.log('Transaction Hash :', transactionHash);
            if (isMainNetwork) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12).<br> <strong>Transaction hash: </strong><br> <a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isRopsten) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong>Transaction hash: </strong><br> <a href="https://ropsten.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isRinkeby) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong> Transaction hash: </strong><br> <a href="https://rinkeby.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isGoerli) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong> Transaction hash: </strong><br> <a href="https://goerli.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else
                statusText.innerHTML = 'Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). Transaction hash: ' + transactionHash
        }).on('confirmation', function () {
            return;
        }).then(function (newContractInstance) {
            if (!newContractInstance.options.address) {
                console.log(newContractInstance);
                return;
            }
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
            var newContractAddress = newContractInstance.options.address;
            if (isMainNetwork) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isHpb) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://hpbscan.org/HRC20/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else
                statusText.innerHTML = 'Contract deployed at address <b>' + newContractAddress + '</b> - keep a record of this.'
        }).catch(function (error) {
            console.error(error);
            assetFormInput.prop("disabled", false);
        })
    }
});

function nthRoot(x, n) {
    if (x < 0 && n % 2 != 1) return NaN; // Not well defined
    return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / n);
}

$("#decimals").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#decimals-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$("#total-supply").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#total-supply-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    } else {
        //TODO:show token total supply will be on bottom of total supply input
        // $("#total-supply").keyup(function (e) {
        //     if ($("#decimals").val() && $('#total-supply').val()) {
        //         console.log(Math.trunc($('#total-supply').val() / Math.pow(10, $("#decimals").val()))
        //     }
        // })
    }
});
