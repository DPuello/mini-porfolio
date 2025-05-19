import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useStorage('dark-mode', false)

  const initTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
})
