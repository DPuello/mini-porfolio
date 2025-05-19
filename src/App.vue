<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import MainLayout from '@/components/layout/MainLayout.vue'
import MainView from '@/views/MainView.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <MainLayout>
    <MainView />
  </MainLayout>
</template>

<style lang="scss">
@use '@/assets/scss/main';
</style>
