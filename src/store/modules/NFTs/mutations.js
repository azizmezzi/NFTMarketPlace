export default {
  createNFT(state, payload) {
    state.NFTs.push(payload);
    state.spinner = false;
    // state.account = payload.account;
  },
  connectWallet(state, payload) {
    state.NFTs = payload.NFTData;
    state.account = payload.account;
  },
  spinnerLaunch(state) {
    state.spinner = true;
  },
};
