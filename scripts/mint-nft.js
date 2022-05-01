require("dotenv").config();
const { API_URL,PUBLIC_KEY,PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x4a02a6b863A9171495D28d69c53E2F9152120dc6";

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

mintNFT("ipfs://QmZ7KnAX1QdZRHRqDZyS2pqC684dEbv86fNCQwmLF5CehM");