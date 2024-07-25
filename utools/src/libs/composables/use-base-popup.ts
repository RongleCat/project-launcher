import { ref, watch } from 'vue'

interface Show {
  show: boolean
}

interface Emits {
  (event: 'update:show', ...args: any[]): void
}

export function useBasePopup<T extends Show, E extends Emits>(props: T, emits: E) {
  const open = ref(props.show)

  watch(
    () => open.value,
    (value) => {
      emits('update:show', value)
    }
  )

  watch(
    () => props.show,
    (value) => {
      open.value = value
    }
  )

  return { open }
}
