// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// form the compiler 0.8.0 the heritage from ERC721 has changed to ERC721URIStorage
contract NFTCollection is ERC721URIStorage, Ownable {
// uint256 public _tokenIds;
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

constructor(string memory name , string memory Symbol)  ERC721(name , Symbol) {
// tokenCounter=0;

}

function totalSupply() public view returns (uint256){
 return _tokenIds.current();
}

function createCollectible (string memory tokenURI ) public onlyOwner returns (uint256){
    // uint256 newItemId = _tokenIds ; 
    _tokenIds.increment();

      uint256 newItemId = _tokenIds.current();
      _safeMint(msg.sender, newItemId);
      _setTokenURI(newItemId, tokenURI);
    // tokenCounter++;
    return newItemId;
}


}