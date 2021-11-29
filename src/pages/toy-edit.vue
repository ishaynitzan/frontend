<template>
  <section class="edit">
    <section v-if="toy">
      <form @submit.prevent="saveToy" class="flex column">
        <label for="name">Name:</label>
        <el-input id="name" v-model="toy.name" placeholder="Name" />

        <label for="price">Price:</label>
        <el-input id="price" v-model="toy.price" placeholder="Price" />

        <label for="labels">In stock:</label>
        <el-select id="labels" v-model="toy.inStock" placeholder="Stock">
          <el-option label="yes" value="true" />
          <el-option label="No" value="false" />
        </el-select>

        <label for="labels">Label:</label>
        <el-select
          v-model="toy.labels"
          multiple
          collapse-tags
          placeholder="Select"
        >
          <el-option
            v-for="(label, idx) in allLabels"
            :key="idx"
            :label="label"
            :value="label"
          >
          </el-option>
        </el-select>
        <button>Save</button>
      </form>
      <button @click="back">Back</button>
    </section>
    <div v-else>Loding...</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      allLabels: [],
      toy: {
        _id: null,
        name: null,
        price: null,
        labels: null,
        inStock: null,
        createdAt: null,
      },
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (toyId) {
      this.setToy(toyId);
    }
    this.allLabels = this.$store.getters.labels;
  },
  methods: {
    setToy(toyId) {
      this.$store
        .dispatch({ type: "toyById", id: toyId })
        .then((toy) => (this.toy = toy));
    },
    saveToy() {
      this.toy.createdAt = Date.now();
      this.toy.inStock = this.toy.inStock === "true" ? true : false;
      const toy = JSON.parse(JSON.stringify(this.toy));
      this.$store.dispatch({ type: "editToy", toy }).then(() => {
        console.log("save successfully");
        this.$router.push("/app");
      });
    },
    back() {
      this.$router.push("/app");
    },
  },
  computed: {},
  destroyed() {},
};
</script>
