
<template>
  <div class="app">
    <toy-filter @filter="setFilter" />
    <toy-list :toys="setToys" @removeToy="removeToy" />
    <button @click="addToy">Add toy</button>
  </div>
</template>

<script>
import toyList from "@/components/toy-list.vue";
import toyFilter from "@/components/toy-filter.vue";

export default {
  components: {
    toyList,
    toyFilter,
  },
  props: [],
  data() {
    return {
      toys: null,
    };
  },
  async created() {
    try {
      await this.$store.dispatch("loadToys", { filterBy: null });
      console.log("Toy app created");
    } catch (err) {
      console.log("Loading toys failed:", err);
    }
  },
  methods: {
    removeToy(id) {
      this.$store.dispatch({ type: "removeToy", id }).then(() => {
        console.log("delete successfully");
      });
    },
    addToy() {
      this.$router.push("/edit");
    },
    async setFilter(filter) {
      try {
        const filterBy = JSON.parse(JSON.stringify(filter));
        console.log('setFilter',filterBy);
        await this.$store.dispatch({ type: "loadToys", filterBy: filterBy });
        console.log("filter was successful");
      } catch (err) {
        console.log("Filter failed:", err);
      }
    },
  },
  computed: {
    setToys() {
      return this.$store.getters.toysToShow;
    },
  },
  destroyed() {},
};
</script>
