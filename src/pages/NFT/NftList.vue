<template>
  <!-- <section>Filter</section> -->

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">refresh</base-button>
        <base-button link to="/createNft">create NFT</base-button>
      </div>

      <ul v-if="hasNFTs">
        <NFTsItems
          v-for="nft in filterNFTs"
          :key="nft.id"
          :id="nft.id"
          :name="nft.name"
          :uri="nft.uri"
          :areas="nft.areas"
        />
      </ul>
      <h3 v-else>No NFTs Found.</h3>
    </base-card>
  </section>
</template>

<script>
import NFTsItems from "../../components/NFTs/NFTsItems.vue";

export default {
  beforeCreate() {
    console.log("registerWeb3 Action dispatched from casino-dapp.vue");
    this.$store.dispatch("NFTs/connectWallet");
  },
  components: { NFTsItems },
  computed: {
    filterNFTs() {
      return this.$store.getters["NFTs/NFTs"];
    },
    hasNFTs() {
      return this.$store.getters["NFTs/hasNFTs"];
    },
    isNFT() {
      return this.$store.getters["NFTs/IsNFT"];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>