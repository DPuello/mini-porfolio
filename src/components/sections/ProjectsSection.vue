<script setup>
import { ref, onMounted, computed, Teleport, onUnmounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectSearch from '@/components/ProjectSearch.vue'
import ProjectFilterModal from '@/components/ProjectFilterModal.vue'
import projectsData from '@/data/projects.json'

const { scrollFadeIn, scaleOnScroll, moveShadow } = useAnimations()
const sectionRef = ref(null)
const titleRef = ref(null)
const searchQuery = ref('')

const selectedCategory = ref('all')
const selectedTechs = ref([])
const selectedSort = ref('newest')
const isFilterModalOpen = ref(false)

const windowRef = ref(null)

const filteredProjects = computed(() => {
  let result = [...projectsData.projects]
  if (selectedCategory.value !== 'all') {
    result = result.filter((project) => project.category === selectedCategory.value)
  }
  if (selectedTechs.value.length > 0) {
    result = result.filter((project) =>
      selectedTechs.value.every((tech) => project.technologies.includes(tech)),
    )
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query)),
    )
  }

  if (selectedCategory.value !== 'all') {
    result = result.filter((project) => project.category === selectedCategory.value)
  }

  if (selectedTechs.value.length > 0) {
    result = result.filter((project) =>
      selectedTechs.value.every((tech) => project.technologies.includes(tech)),
    )
  }

  switch (selectedSort.value) {
    case 'newest':
      result = [...result].sort((a, b) => b.id - a.id)
      break
    case 'oldest':
      result = [...result].sort((a, b) => a.id - b.id)
      break
    case 'name-asc':
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'name-desc':
      result = [...result].sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
})

const showModal = () => {
  isFilterModalOpen.value = true
}

const closeModal = () => {
  isFilterModalOpen.value = false
}

const handleSearch = (query) => {
  searchQuery.value = query
}

const handleFilter = (category) => {
  selectedCategory.value = category
}

const handleSort = (sort) => {
  selectedSort.value = sort
}

const handleTechFilter = (techs) => {
  selectedTechs.value = techs
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  selectedTechs.value = []
  searchQuery.value = ''
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isFilterModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  if (sectionRef.value) {
    scrollFadeIn(sectionRef.value, { y: 30, persist: true })
    scaleOnScroll(sectionRef.value, 1.01, {
      start: 'top 70%',
      end: 'center 30%',
    })
  }

  if (windowRef.value) {
    moveShadow(windowRef.value, 20, {
      start: 'top 70%',
      end: 'center 30%',
    })
  }

  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="section section--projects"
    aria-labelledby="projects-title"
  >
    <div ref="windowRef" class="container window">
      <header class="projects__header">
        <h2 ref="titleRef" id="projects-title" class="section__title" tabindex="0">Projects</h2>

        <div class="projects__controls">
          <ProjectSearch class="projects__search" @search="handleSearch" />

          <button
            type="button"
            id="projects-filter-btn"
            class="btn btn--secondary projects__filter-btn"
            @click="showModal"
            aria-label="Filter projects"
            aria-haspopup="dialog"
          >
            Filter
          </button>
        </div>
      </header>

      <div v-if="filteredProjects.length === 0" class="projects__empty">
        <figure class="about__figure">
          <img
            src="/images/404.svg"
            width="200"
            height="200"
            alt="No projects found"
            class="about__image"
            loading="lazy"
          />
        </figure>
        <button @click="resetFilters()" class="btn btn--primary" aria-label="Reset all filters">
          Reset Filters
        </button>
      </div>

      <div v-else class="projects__grid" role="list">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          role="listitem"
        />
      </div>
    </div>
  </section>

  <Teleport to="body">
    <ProjectFilterModal
      v-if="isFilterModalOpen"
      :selectedTechs="selectedTechs"
      @filter="handleFilter"
      @sort="handleSort"
      @tech-filter="handleTechFilter"
      @close="closeModal"
      @reset="resetFilters"
      aria-labelledby="filter-modal-title"
    />
  </Teleport>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.section--projects {
  .container {
    @include mix.flex-column;
    @include mix.flex-center;
  }
  .section__title {
    position: relative;
    margin-bottom: 0;
    &::before {
      @include mix.right-column;
    }
  }
  .container.window {
    background-color: #fff8;

    @include mix.dark-mode {
      background-color: #fff1;
    }
  }
}

.projects__filter-btn.btn--secondary {
  white-space: nowrap;
  color: #fff;
  font-weight: bold;

  @include mix.dark-mode {
    color: vars.$primary-light;
  }
}

.projects {
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1.5rem;
    width: 100%;

    @include mix.responsive(md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__controls {
    display: flex;
    gap: 1rem;
    width: 100%;

    @include mix.responsive(md) {
      width: auto;
    }
  }

  &__search {
    flex: 1;

    @include mix.responsive(md) {
      width: 250px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;

    @include mix.responsive(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mix.responsive(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem;
    text-align: center;
    background-color: vars.$gray-100;
    border-radius: 0.5rem;

    @include mix.dark-mode {
      background-color: rgba(vars.$gray-800, 0.3);
    }
  }
}
</style>
