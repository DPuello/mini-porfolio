<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'
import { gsap } from 'gsap'
import projects from '@/data/projects.json'
import FilterSingle from '@/components/FilterSingle.vue'
import FilterMultiple from './FilterMultiple.vue'

const props = defineProps({
  selectedTechs: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['filter', 'sort', 'tech-filter', 'close'])

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'A-Z', value: 'name-asc' },
  { label: 'Z-A', value: 'name-desc' },
]

const modalRef = ref(null)
const titleRef = ref(null)
const { fadeIn, fadeInUp } = useAnimations()

const selectedCategory = ref('all')
const selectedSort = ref('newest')
const selectedTechs = ref(props.selectedTechs)

const categories = computed(() => {
  const uniqueCategories = new Set([
    { label: 'All', value: 'all' },
    ...projects.projects.map((project) => ({ label: project.category, value: project.category })),
  ])
  return Array.from(uniqueCategories)
})

const technologies = computed(() => {
  const techSet = new Set()
  projects.projects.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech))
  })
  return Array.from(techSet)
})

const handleFilter = (category) => {
  selectedCategory.value = category
  emit('filter', category)
}

const handleSort = (sort) => {
  selectedSort.value = sort
  emit('sort', sort)
}

const handleTechToggle = (tech) => {
  const index = selectedTechs.value.indexOf(tech)
  if (index === -1) {
    selectedTechs.value.push(tech)
  } else {
    selectedTechs.value.splice(index, 1)
  }
  emit('tech-filter', selectedTechs.value)
}

const closeModal = () => {
  const filterButton = modalRef.value.querySelector('#projects-filter-btn')

  if (modalRef.value) {
    const content = modalRef.value.querySelector('.modal-content')
    gsap.to(content, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        filterButton?.focus()
        emit('close')
      },
    })
  } else {
    filterButton?.focus()
    emit('close')
  }
}

const handleBackdropClick = (event) => {
  if (event.target === modalRef.value) {
    closeModal()
  }
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  selectedSort.value = 'newest'
  selectedTechs.value = []
  emit('reset')
}

onMounted(() => {
  if (modalRef.value) {
    fadeIn(modalRef.value, 0, 0.3)

    const content = modalRef.value.querySelector('.modal-content')
    if (content) {
      fadeInUp(content, 0, 0.4, 30)
    }

    if (titleRef.value) {
      titleRef.value.focus()
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }
})
</script>

<template>
  <div ref="modalRef" class="modal" @click="handleBackdropClick">
    <div class="modal__content">
      <div class="modal__header">
        <h3 ref="titleRef" class="modal__title" tabindex="0">Filter Projects</h3>
        <button
          class="modal__close-button"
          @click="closeModal"
          tabindex="0"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div class="modal__body">
        <FilterSingle
          :options="categories"
          @filter="handleFilter"
          title="Categories"
          :selectedOption="selectedCategory"
        />
        <FilterSingle
          :options="sortOptions"
          @filter="handleSort"
          title="Sort by"
          :selectedOption="selectedSort"
        />
        <FilterMultiple
          :options="technologies"
          @filter="handleTechToggle"
          title="Technologies"
          :selectedOptions="selectedTechs"
        />
      </div>

      <div class="modal__footer">
        <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.modal {
  &__title {
    outline: none;
  }

  &__content {
    @include mix.dark-mode {
      background-color: vars.$bg-dark;
    }
  }

  &__close-button {
    @include mix.dark-mode {
      color: vars.$text-light;
    }
  }
}

.project-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
</style>
