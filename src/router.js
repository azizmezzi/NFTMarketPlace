import { createRouter, createWebHistory } from "vue-router";

// import HomePage from "./pages/HomePage.vue";
import NftList from "./pages/NFT/NftList.vue";
import NFTDetail from "./pages/NFT/NFT.vue";
import CreateNft from "./pages/NFT/CreateNft.vue";
import AddNFT from "./pages/NFT/AddNFT.vue";
import MinNFT from "./pages/NFT/minNFT.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/NftList" },
    // { path: "/HomePage", component: HomePage },
    { path: "/NftList", component: NftList },
    { path: "/nftlist/:id", component: NFTDetail, props: true, children: [] },
    { path: "/createNft", component: CreateNft },
    { path: "/AddNFT", component: AddNFT },
    { path: "/minNFT", component: MinNFT },
    // { path: "/user", component: null },
    { path: "/notFound(.*)", component: null },
  ],
});

export default router;
