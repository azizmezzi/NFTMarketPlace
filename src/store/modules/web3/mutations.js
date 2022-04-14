export default {
    createNFT(state, payload) {
      console.log(payload);
      state.NFTs.push(payload);
    },
  };