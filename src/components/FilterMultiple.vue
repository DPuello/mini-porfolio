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
  selectedOptions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['filter'])

const handleOptionToggle = (option) => {
  emit('filter', option)
}
</script>

<template>
  <div class="filter">
    <h4 class="filter__subtitle" tabindex="0">{{ title }}</h4>
    <div class="filter--multiple__list">
      <button
        v-for="option in options"
        :key="option"
        tabindex="0"
        @click="handleOptionToggle(option)"
        class="filter--multiple__button"
        :class="{ 'filter--multiple__button--active': selectedOptions.includes(option) }"
      >
        <div
          class="filter--multiple__checkbox"
          :class="{ 'filter--multiple__checkbox--active': selectedOptions.includes(option) }"
        >
          <svg
            v-if="selectedOptions.includes(option)"
            class="filter--multiple__check-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/scss/_variables.scss' as vars;

.filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--multiple {
    &__title {
      font-size: 0.875rem;
      font-weight: 500;
      color: vars.$gray-600;
      margin-bottom: 0.75rem;

      .dark & {
        color: vars.$gray-400;
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
      background-color: vars.$gray-100;
      color: vars.$gray-700;

      .dark & {
        background-color: vars.$gray-800;
        color: vars.$gray-300;
      }

      &:hover {
        background-color: vars.$gray-200;

        .dark & {
          background-color: vars.$gray-700;
        }
      }

      &--active {
        background-color: vars.$primary-light;
        color: white;

        &:hover {
          background-color: color.scale(vars.$primary-light, $lightness: -10%);
        }
      }
    }

    &__checkbox {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid vars.$gray-400;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      .dark & {
        border-color: vars.$gray-600;
      }

      &--active {
        border-color: white;
        background-color: white;
      }
    }

    &__check-icon {
      width: 14px;
      height: 14px;
      color: vars.$primary-light;
    }
  }
}
</style>
