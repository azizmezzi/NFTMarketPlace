export default {
  NFTs(state) {
    return state.NFTs;
  },
  Spinner(state) {
    return state.spinner;
  },
  hasNFTs(state) {
    return state.NFTs && state.NFTs.length > 0;
  },
  IsNFT(_, getters, _2, rootGetters) {
    const NFTs = getters.NFTs;
    const userId = rootGetters.userId;
    return NFTs.some((nft) => nft.id === userId);
  },
};
