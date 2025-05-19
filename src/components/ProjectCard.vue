<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const isHovered = ref(false)
const cardRef = ref(null)
const cardFocused = ref(false)

onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }
})

const handleMouseEnter = () => {
  isHovered.value = true
  if (cardRef.value) {
    gsap.to(cardRef.value, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
    })
  }
}

const handleMouseLeave = () => {
  if (!cardFocused.value) {
    isHovered.value = false
    if (cardRef.value) {
      gsap.to(cardRef.value, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }
}

const handleFocus = () => {
  cardFocused.value = true
  isHovered.value = true
  if (cardRef.value) {
    gsap.to(cardRef.value, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
    })
  }
}

const handleBlur = (event) => {
  if (!cardRef.value.contains(event.relatedTarget)) {
    cardFocused.value = false
    isHovered.value = false
    if (cardRef.value) {
      gsap.to(cardRef.value, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }
}
</script>

<template>
  <article
    ref="cardRef"
    class="card card--project"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocus"
    @focusout="handleBlur"
    tabindex="0"
  >
    <div class="card__image-container">
      <figure class="card__image--figure">
        <img
          :src="project.image"
          :alt="`Screenshot of ${project.title} project`"
          class="card__image"
          :class="{ 'card__image--scaled': isHovered }"
          loading="lazy"
        />
      </figure>
      <div class="card__overlay" aria-hidden="true">
        <div class="card__content">
          <span class="card__category">
            {{ project.category }}
          </span>
          <div class="card__tags">
            <span v-for="tech in project.technologies" :key="tech" class="card__tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card__footer">
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__description">{{ project.description }}</p>
      <div class="card__buttons">
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--primary"
          aria-label="View live demo of project: ${project.title}"
        >
          View Demo
        </a>
        <a
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--github"
          aria-label="View source code on GitHub for: ${project.title}"
        >
          GitHub
        </a>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.card.card--project {
  @include mix.dark-mode {
    background-color: vars.$bg-dark;
  }

  &:focus-visible {
    outline: 3px solid vars.$primary-light;
    outline-offset: 4px;

    @include mix.dark-mode {
      outline-color: vars.$primary-dark;
    }
  }
}

.card {
  justify-content: space-between;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &__image-container {
    position: relative;
    overflow: hidden;
  }

  &__image--figure {
    margin: 0;
  }

  &__image {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    transition: transform 0.5s;

    &--scaled {
      transform: scale(1.1);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    .card:hover &,
    .card:focus-within & {
      opacity: 1;
    }
  }

  &__content {
    color: white;
    text-align: center;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__description {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    justify-content: center;
  }

  &__footer {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  &__tag {
    padding: 0.25rem 0.5rem;
    background-color: #0008;
    border-radius: 9999px;
    font-size: 0.75rem;

    :root[data-theme='dark'] & {
      background-color: #374151;
    }
  }

  &__category {
    font-size: 1rem;
    color: #fff;
    font-weight: 600;
    margin-left: auto;
  }
}

.btn.btn--primary {
  @include mix.dark-mode {
    background-color: vars.$secondary-dark;
  }
  &:hover {
    @include mix.dark-mode {
      background-color: vars.$secondary-dark;
    }
  }
}

.btn {
  font-size: 0.875rem;

  &:hover {
    color: white;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  &--primary {
    @extend .btn;
  }

  &--github {
    @extend .btn;
    background-color: #1f2937;
    color: white;

    &:hover {
      background-color: #374151;

      @include mix.dark-mode {
        color: #fff;
      }
    }

    @include mix.dark-mode {
      color: #fff;
    }
  }
}
</style>
