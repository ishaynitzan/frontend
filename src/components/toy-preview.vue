<template>
  <section class="flex space-evenly align-center">
    <fieldset class="fieldset flex grow-2 space-evenly">
      <legend>Info</legend>
      <span>{{ toy.name }} </span>
      <span>{{ toy.price }} </span>
      <span>
        <span v-if="toy.inStock">In stock</span>
        <span v-else>In not stock</span>
      </span>
    </fieldset>
    <fieldset class="fieldset flex space-evenly align-center grow-1">
      <legend>Labels</legend>
      <el-tag type="success" v-for="(label, idx) in toy.labels" :key="idx">{{ label }}</el-tag>

    </fieldset>
    <fieldset class="fieldset flex space-evenly align-center">
      <legend>Action</legend>
      <router-link :to="'/edit/' + toy._id" class="far fa-edit" title="Edit"/>
      <router-link :to="'/details/' + toy._id" class="far fa-file" title="Details"/>
      <button @click="remove" class="far fa-trash-alt" title="Delete"></button>
    </fieldset>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["toy"],
  template: ``,
  data() {
    return {};
  },
  created() {},
  methods: {
    remove(){
      this.$emit("removeToy" , this.toy._id);
    }
  },
  computed: {},
  destroyed() {},
};
</script>
