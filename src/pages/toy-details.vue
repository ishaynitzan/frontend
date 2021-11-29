<template>
<section class="detalis">
  <section v-if="toy">
      <label for="name">Name: <span id="name">{{toy.name}}</span>
      </label><br>
      <label for="name">Id: <span id="name">{{toy._id}}</span>
      </label><br>
      <label for="name">Price: <span id="name">{{toy.price}}</span>
      </label><br>
      <label for="name">Created At: <span id="name">{{toy.createdAt}}</span>
      </label><br>
      <div>
        <span>Labels: </span>
        <span v-for="(label,idx) in toy.labels" :key="idx" class="label">
        {{label}}
      </span><br>
        <span>In stock: </span>
        <span v-if="toy.inStock">Yes</span> 
        <span v-else>Np</span> 
      </div>
      <button @click="back">Back</button>
  </section>
  <div v-else>Loding...</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const { toyId } = this.$route.params;
    this.setToy(toyId)
  },
  methods: {
    setToy(toyId){
       this.$store
      .dispatch({ type: "toyById", id : toyId })
      .then((toy) => (this.toy = toy));
    },
    back(){
      this.$router.push('/app');
    }
  },
  computed: {},
  destroyed() {},
};
</script>
