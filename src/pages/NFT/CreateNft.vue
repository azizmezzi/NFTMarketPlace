<template>
  <section>
    <base-card>
      <h2>create NFT</h2>
      <NFTForm @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import NFTForm from "../../components/NFTs/NFTForm.vue";
export default {
  components: {
    NFTForm,
  },

  methods: {
    saveData(data) {
      console.log(data);
      // this.$store.dispatch("Web3/createNFT");
      this.$store.dispatch("NFTs/createNFT");
    //   this.$router.push('/NftList')
      this.$router.replace('/NftList')
    },
  },
};
</script>