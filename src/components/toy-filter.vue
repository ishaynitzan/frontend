  <template>
  <section class="toy-filter">
    <el-input
      @input="searchKey"
      placeholder="Search"
      clearable
      v-model="filterBy.searchKey"
    />

    <el-select
      @change="onChange"
      placeholder="Filter"
      v-model="filterBy.labels"
    >
      <el-option label="All" value=""></el-option>
      <el-option
        v-for="label in allLabels"
        :label="label"
        :value="label"
        :key="label"
      />
    </el-select>

    <el-select
      @change="onChange"
      placeholder="In Stock"
      v-model="filterBy.inStock"
    >
      <el-option label="All" value=""></el-option>
      <el-option label="In stock" value="true"></el-option>
      <el-option label="In not stock" value="false"></el-option>
    </el-select>

    <el-select @change="onChange" placeholder="Sort" v-model="filterBy.sort">
      <el-option label="Name" value="Name"></el-option>
      <el-option label="Price" value="Price"></el-option>
      <el-option label="Time" value="Time"></el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  name: "toy-filter",
  components: {},
  data() {
    return {
      filterBy: {
        labels: "",
        searchKey: null,
        inStock: "",
        sort: "Name",
      },
      debounce: null,
      allLabels: null,
    };
  },
  created() {
    this.allLabels = this.$store.getters.labels;
  },
  methods: {
    onChange() {
      this.$emit("filter", this.filterBy);
    },
    searchKey() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.onChange();
      }, 800);
    },
  },
  destroyed() {},
};
</script>
