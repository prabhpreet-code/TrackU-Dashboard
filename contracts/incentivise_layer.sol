pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrackUNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(address => uint256) public userMetrics;

    event NFTMinted(address recipient, uint256 tokenId, string tokenURI);
    event NFTTransferred(address from, address to, uint256 tokenId);

    constructor() ERC721("TrackUNFT", "TUNFT") {
        tokenCounter = 0;
    }

    function updateUserMetrics(address user, uint256 newMetric) external onlyOwner {
        userMetrics[user] = newMetric;
    }

    function mintNFT(address recipient, string memory tokenURI) external onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;

        emit NFTMinted(recipient, newTokenId, tokenURI);
        return newTokenId;
    }

    function transferNFT(address from, address to, uint256 tokenId) external onlyOwner {
        _transfer(from, to, tokenId);
        emit NFTTransferred(from, to, tokenId);
    }

    function getUserMetric(address user) external view returns (uint256) {
        return userMetrics[user];
    }
}