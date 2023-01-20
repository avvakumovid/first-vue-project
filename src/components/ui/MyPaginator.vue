<template>
  <div class='paginator'>
    <a @click='setpage(page)' v-for='page in pages' :key='page' :class='{  "current-page" : page == modelValue}'>

      {{ page }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'my-paginator',
  props: {
    pages: {
      type: Number,
      required: true
    },
    modelValue: Number
  },
  methods: {
    setpage(page) {
      this.$emit('update:modelValue', page)
    }
  }
}
</script>

<style scoped>
.paginator {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  color: teal;
}

.current-page {
  color: rgb(1, 45, 45);
  font-weight: 700;
}
</style>