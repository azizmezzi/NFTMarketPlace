// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Market {
    enum tokenStatus {
        Active,
        Sold,
        Cancelled
    }

    struct Tokens {
        uint256 tokenId;
        address tokenAddress;
        uint256 price;
        address seller;
        tokenStatus status;
    }

    event Listed(
        uint256 tokenId,
        address tokenAddress,
        uint256 price,
        address seller,
        uint256 TokenListId
    );
    event Sale(
        uint256 tokenId,
        address tokenAddress,
        uint256 price,
        address seller,
        uint256 TokenListId
    );
    event Canceled(uint256 TokenListId, address seller);

    uint256 private TokenListId = 0;
    mapping(uint256 => Tokens) private TokenList;

    function listTokens(
        uint256 tokenId,
        address tokenAddress,
        uint256 price
    ) external {
        ERC721 erc721 = ERC721(tokenAddress);
        erc721.transferFrom(msg.sender, address(this), tokenId);
        Tokens memory tokens = Tokens(
            tokenId,
            tokenAddress,
            price,
            msg.sender,
            tokenStatus.Active
        );
        TokenListId++;
        TokenList[TokenListId] = tokens;

        emit Listed(tokenId, tokenAddress, price, msg.sender, TokenListId);
    }

    function getToken(uint256 TokenlistedId)
        public
        view
        returns (Tokens memory)
    {
        return TokenList[TokenlistedId];
    }

    function BuyToken(uint256 tokenId) external payable {
        Tokens storage token = TokenList[tokenId];
        require(token.status == tokenStatus.Active, "listing is not avtive");
        require(msg.sender != token.seller, "seller cannot be buyer");
        require(msg.value == token.price, "insufficient payement");

        token.status = tokenStatus.Sold;

        ERC721 erc721 = ERC721(TokenList[tokenId].tokenAddress);
        erc721.transferFrom(address(this), msg.sender, tokenId);
        payable(token.seller).transfer(token.price);
        emit Sale(
            token.tokenId,
            token.tokenAddress,
            token.price,
            token.seller,
            tokenId
        );
    }

    function cancel(uint256 tokenId) public {
        Tokens storage token = TokenList[tokenId];
        require(token.status == tokenStatus.Active, "listing is not avtive");
        require(msg.sender == token.seller, "seller cannot be buyer");

        token.status = tokenStatus.Sold;
        ERC721 erc721 = ERC721(TokenList[tokenId].tokenAddress);
        erc721.transferFrom(address(this), msg.sender, tokenId);

        emit Canceled(tokenId, msg.sender);
    }
}
