<template>
  <div>
    <AutoList>
      <template #content="{data}">
        <div style="height: 90px">
          {{ data }}

        </div>
      </template>

    </AutoList>
  </div>
</template>
<script setup>
import AutoList from '@/components/AutoList/AutoList.vue'
</script>
