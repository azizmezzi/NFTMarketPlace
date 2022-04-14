<template>
  <h1>Nft list</h1>
</template>

<script>
export default {
  beforeCreate() {
    console.log("registerWeb3 Action dispatched from casino-dapp.vue");
    this.$store.dispatch("NFTs/connectWallet");
    
  },
};
</script>