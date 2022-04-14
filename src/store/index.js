import { createStore } from "vuex";
import NFTmodules from "./modules/NFTs/index.js";
import Web3modules from "./modules/web3/index.js";

const store = createStore({
  modules: {
    NFTs: NFTmodules,
    Web3: Web3modules,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
