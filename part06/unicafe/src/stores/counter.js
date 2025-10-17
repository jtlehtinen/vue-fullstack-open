import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const bad = ref(0)
  const neutral = ref(0)
  const good = ref(0)

  function $reset() {
    bad.value = 0
    neutral.value = 0
    good.value = 0
  }

  function incrementGood() {
    good.value++
  }

  function incrementNeutral() {
    neutral.value++
  }

  function incrementBad() {
    bad.value++
  }

  return {
    bad,
    neutral,
    good,

    incrementBad,
    incrementNeutral,
    incrementGood,

    $reset,
  }
})
