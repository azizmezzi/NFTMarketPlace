<template>
  <section>
    <base-card>
      <div v-if="!spinner">
        <h2>Add NFT to marketplace</h2>
        <FormAddNFT @add-nft="AddNFT" />
      </div>
      <BaseSpinner v-else />
    </base-card>
  </section>
</template>

<script>
import FormAddNFT from "../../components/NFTs/FormAddNFT.vue";
import BaseSpinner from "../../components/UI/BaseSpinner.vue";

export default {
  components: { FormAddNFT, BaseSpinner },
  computed: {
    spinner() {
      return this.$store.getters["NFTs/Spinner"];
    },
  },
  methods: {
    async AddNFT(address) {
      this.$store.dispatch("NFTs/spinnerLaunch");
      await this.$store.dispatch("NFTs/createNFT", address);
      this.$router.replace("/NftList");
    },
  },
};
</script>