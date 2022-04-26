const { ethers } = require("hardhat");

async function main() {
    const MyNft = await ethers.getContractFactory("MyNFT");
    const myNft = await MyNft.deploy();
    await myNft.deployed();
    console.log("contract address:", myNft.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.log(error);
    process.exit(1);
 })