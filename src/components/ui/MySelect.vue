<template>
  <div>
    <select value='modelValue' @change='select'>
      <option disabled value=''>Выберите фильта</option>
      <option v-for='option in options' :value='option.value' :key='option.value'>{{
        option.name
      }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    select(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>