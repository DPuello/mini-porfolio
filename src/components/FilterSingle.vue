<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
    default: 'all',
  },
})

const emit = defineEmits(['filter'])

const handleFilter = (option) => {
  emit('filter', option)
}
</script>

<template>
  <section class="filter">
    <h4 class="filter__subtitle" tabindex="0">{{ title }}</h4>
    <div class="filter--single__container">
      <button
        v-for="option in options"
        :key="option.value"
        tabindex="0"
        @click="handleFilter(option.value)"
        class="btn filter--single__btn"
        :class="{ 'filter--single__btn--active': selectedOption === option.value }"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--single {
    &__container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    &__btn {
      background-color: vars.$gray-100;
      color: vars.$text-light;
      transition:
        background-color 0.2s,
        color 0.2s;

      @include mix.dark-mode {
        background-color: vars.$gray-800;
        color: vars.$text-dark;
      }

      &--active {
        background-color: vars.$primary-light;
        color: white;

        @include mix.dark-mode {
          background-color: vars.$primary-dark;
        }
      }
    }
  }
}
</style>
