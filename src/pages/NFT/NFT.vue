
<template>
  <section>
    <base-card>
      <h2>
        {{ fullName }}
      </h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <h2>Interest</h2>
      <base-button link :to="contact"></base-button>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedNFT: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedNFT.firstName + " " + this.selectedNFT.lastName;
    },
    areas() {
      return this.selectedNFT.areas;
    },
  },
  created() {
    this.selectedNFT = this.$store.getters["NFTs/NFTs"].find(
      (nfts) => this.id === nfts.id
    );
  },
};
</script>