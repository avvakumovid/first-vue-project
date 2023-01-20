<template>
  <input :value='value' @input='updateInput' class='input' type='text'>
</template>

<script>
export default {
  name: 'my-input',
  props: {
    value: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  widows: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>