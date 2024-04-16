<template>
  <div
    class="radius-block cell-button"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['onClick'])

function onClick() {
  emits('onClick')
}
</script>

<style scoped lang="scss">
.cell-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #03a9f4;
  }
}
</style>
