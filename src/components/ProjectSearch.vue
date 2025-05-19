<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search projects...',
  },
})

const emit = defineEmits(['search'])

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
  emit('search', newValue.toLowerCase())
})
</script>

<template>
  <div class="relative project-search">
    <input v-model="searchQuery" type="text" :placeholder="placeholder" class="search-input" />
    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mixins;

.project-search {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.03);
  }
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: white;

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px vars.$primary-light;
  }

  @include mixins.dark-mode {
    border-color: #000;
    background-color: #0002;
    color: #fff;
  }

  &::placeholder {
    @include mixins.dark-mode {
      color: #fff9;
    }
  }
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #000;

  @include mixins.dark-mode {
    color: #fff;
  }
}

.project-search {
  width: 100%;
  max-width: 400px;
}
</style>
