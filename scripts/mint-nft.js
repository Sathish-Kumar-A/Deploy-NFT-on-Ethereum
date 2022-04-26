require("dotenv").config();
const { API_URL,PUBLIC_KEY,PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x946757f6891422453b7312e8b10f1cdbe058a6bb";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    const tx = {
        "from": PUBLIC_KEY,
        "nonce": nonce,
        "to": contractAddress,
        "data": nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
        "gas":"5000000"
    }

    const signedPromise = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY).then((result) => {
        web3.eth.sendSignedTransaction(result.rawTransaction, (err, txHash) => {
            if (err) {
                console.log("Something went wrong",err);
            } else {
                console.log("The transaction hash is", txHash);
            }
        })
    })
    .catch ((err) => {
        console.log("Promise failed", err);
    })
};

mintNFT("ipfs://Qmd54sm5tHmkQUYhpqPuvWNhquKUh4BYipF9SL51mqkrKj")