// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public ownerAddress;
    address payable public ownerPayAddress;

    constructor() ERC721("MyNFT","NFT"){
        ownerAddress=msg.sender;
        ownerPayAddress=payable(msg.sender);
    }

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId= _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function isOwner() view public returns (bool) {
        if(ownerAddress==address(msg.sender)){
            return true;
        }
        else{
            return false;
        }
    }

    function getOwner() view public returns (address){
        return ownerAddress;
    }

    function transferToken(uint token_id) public payable returns(uint){
        ownerPayAddress.transfer(msg.value);
        _transfer(ownerAddress,msg.sender,token_id);
        return token_id;
    }

}