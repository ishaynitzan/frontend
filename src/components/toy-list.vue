<template>
  <ul class="toy-list flex column align-center">
    <li v-for="toy in toys" :key="toy._id" class="toy-prev">
      <toy-preview :toy="toy" @removeToy="removeToy" />
    </li>
  </ul>
</template>

<script>
import toyPreview from "@/components/toy-preview.vue";

export default {
  components: {
    toyPreview,
  },
  props: ["toys"],
  data() {
    return {};
  },
  created() {},
  methods: {
    removeToy(id){
     this.$emit("removeToy" , id);

    }
  },
  computed: {},
  destroyed() {},
};
</script>
