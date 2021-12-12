var web3,
    provider,
    isMainNetwork,
    isHpb,
    isMetaMaskLocked,
    address;

// abi of StandardToken.sol
var abi = [
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
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
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newOwner",
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
		"inputs": [],
		"name": "owner",
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
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

;



// bytecode of StandardToken.sol
var bytecode = '608060405234801561001057600080fd5b50600080546001600160a01b0319163317905560408051808201909152600280825261139560f21b602090920191825261004a91816100e2565b5060408051808201909152600280825261139560f21b6020909201918252610074916003916100e2565b506004805460ff1916905560646005819055600080546001600160a01b0390811682526006602090815260408084208590558354815195865290519216937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a3610175565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012357805160ff1916838001178555610150565b82800160010185558215610150579182015b82811115610150578251825591602001919060010190610135565b5061015c929150610160565b5090565b5b8082111561015c5760008155600101610161565b610ac4806101846000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063d4ee1d9011610066578063d4ee1d90146103a6578063dc39d06d146103ae578063dd62ed3e146103da578063f2fde38b14610408576100f5565b80638da5cb5b1461029357806395d89b41146102b7578063a9059cbb146102bf578063cae9ca51146102eb576100f5565b806323b872dd116100d357806323b872dd1461020f578063313ce5671461024557806370a082311461026357806379ba509714610289576100f5565b806306fdde0314610138578063095ea7b3146101b557806318160ddd146101f5575b6040805162461bcd60e51b81526020600482015260136024820152722737ba1020b1b1b2b83a34b7339022ba3432b960691b604482015290519081900360640190fd5b61014061042e565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017a578181015183820152602001610162565b50505050905090810190601f1680156101a75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101e1600480360360408110156101cb57600080fd5b506001600160a01b0381351690602001356104bc565b604080519115158252519081900360200190f35b6101fd610523565b60408051918252519081900360200190f35b6101e16004803603606081101561022557600080fd5b506001600160a01b03813581169160208101359091169060400135610560565b61024d610659565b6040805160ff9092168252519081900360200190f35b6101fd6004803603602081101561027957600080fd5b50356001600160a01b0316610662565b61029161067d565b005b61029b6106f8565b604080516001600160a01b039092168252519081900360200190f35b610140610707565b6101e1600480360360408110156102d557600080fd5b506001600160a01b03813516906020013561075f565b6101e16004803603606081101561030157600080fd5b6001600160a01b038235169160208101359181019060608101604082013564010000000081111561033157600080fd5b82018360208201111561034357600080fd5b8035906020019184600183028401116401000000008311171561036557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610803945050505050565b61029b610954565b6101e1600480360360408110156103c457600080fd5b506001600160a01b038135169060200135610963565b6101fd600480360360408110156103f057600080fd5b506001600160a01b0381358116916020013516610a05565b6102916004803603602081101561041e57600080fd5b50356001600160a01b0316610a30565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104b45780601f10610489576101008083540402835291602001916104b4565b820191906000526020600020905b81548152906001019060200180831161049757829003601f168201915b505050505081565b3360008181526007602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a35060015b92915050565b600080805260066020527f54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f85460055461055b91610a69565b905090565b6001600160a01b0383166000908152600660205260408120546105839083610a69565b6001600160a01b03851660009081526006602090815260408083209390935560078152828220338352905220546105ba9083610a69565b6001600160a01b0380861660009081526007602090815260408083203384528252808320949094559186168152600690915220546105f89083610a7e565b6001600160a01b0380851660008181526006602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b60045460ff1681565b6001600160a01b031660009081526006602052604090205490565b6001546001600160a01b0316331461069457600080fd5b600154600080546040516001600160a01b0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360018054600080546001600160a01b03199081166001600160a01b03841617909155169055565b6000546001600160a01b031681565b6002805460408051602060018416156101000260001901909316849004601f810184900484028201840190925281815292918301828280156104b45780601f10610489576101008083540402835291602001916104b4565b336000908152600660205260408120546107799083610a69565b33600090815260066020526040808220929092556001600160a01b038516815220546107a59083610a7e565b6001600160a01b0384166000818152600660209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b3360008181526007602090815260408083206001600160a01b038816808552908352818420879055815187815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a3836001600160a01b0316638f4ffcb1338530866040518563ffffffff1660e01b815260040180856001600160a01b03168152602001848152602001836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156108e35781810151838201526020016108cb565b50505050905090810190601f1680156109105780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b15801561093257600080fd5b505af1158015610946573d6000803e3d6000fd5b506001979650505050505050565b6001546001600160a01b031681565b600080546001600160a01b0316331461097b57600080fd5b600080546040805163a9059cbb60e01b81526001600160a01b0392831660048201526024810186905290519186169263a9059cbb926044808401936020939083900390910190829087803b1580156109d257600080fd5b505af11580156109e6573d6000803e3d6000fd5b505050506040513d60208110156109fc57600080fd5b50519392505050565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205490565b6000546001600160a01b03163314610a4757600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b600082821115610a7857600080fd5b50900390565b8181018281101561051d57600080fdfea2646970667358221220e611d77a9b5c48735607afa886bb77b1e3af449336b231518251d5f776e2ad5c64736f6c634300060c0033';

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
            } else if (isHpb) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong>Transaction hash: </strong><br> <a href="https://hpbscan.org/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
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
