<!-- Counter.vue -->
<template>
  <div class="counter">
    <h2>{{ count }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref<number>(0)

    const increment = (): void => {
      count.value++
    }

    const decrement = (): void => {
      count.value--
    }

    return {
      count,
      increment,
      decrement
    }
  }
})
</script>

<style scoped>
/* ... */
</style>
