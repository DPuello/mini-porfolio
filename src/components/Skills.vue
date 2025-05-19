<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skills from '@/data/skills.json'

gsap.registerPlugin(ScrollTrigger)

const skillsRef = ref(null)
const categoryRefs = ref([])
const orbitalElements = ref({})
const scrollY = ref(0)

const rotationConfig = {
  baseSensitivity: 0.0005,
  categoryMultiplier: 0.2,
  smoothing: 0.3,
}

function getCirclePosition(index, total, scrollModifier = 0, categoryIndex = 0) {
  const direction = categoryIndex % 2 === 0 ? 1 : -1

  const speed =
    rotationConfig.baseSensitivity * (1 + categoryIndex * rotationConfig.categoryMultiplier)

  const rotationFactor = scrollModifier * speed * direction * 20

  const angle = (index / total) * 2 * Math.PI + rotationFactor

  const radius = 220

  const x = Math.cos(angle) * radius - 75
  const y = Math.sin(angle) * radius - 75

  return { x, y }
}

function updatePositions() {
  skills.skills.forEach((category, categoryIndex) => {
    const categoryKey = `category-${categoryIndex}`

    if (orbitalElements.value[categoryKey]) {
      category.items.forEach((skill, skillIndex) => {
        const circle = orbitalElements.value[categoryKey][skillIndex]
        if (circle) {
          const { x, y } = getCirclePosition(
            skillIndex,
            category.items.length,
            scrollY.value,
            categoryIndex,
          )

          gsap.to(circle, {
            x,
            y,
            duration: rotationConfig.smoothing,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }
      })
    }
  })
}

onMounted(() => {
  if (skillsRef.value) {
    skills.skills.forEach((category, categoryIndex) => {
      const categoryKey = `category-${categoryIndex}`
      orbitalElements.value[categoryKey] = []

      category.items.forEach((skill, skillIndex) => {
        const circle = document.getElementById(`skill-${categoryIndex}-${skillIndex}`)
        if (circle) {
          const { x, y } = getCirclePosition(skillIndex, category.items.length, 0, categoryIndex)

          gsap.set(circle, {
            x,
            y,
          })

          orbitalElements.value[categoryKey].push(circle)
        }
      })
    })

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        scrollY.value = window.scrollY
        updatePositions()
      },
    })
  }
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <div ref="skillsRef" class="skills__container">
    <div
      v-for="(category, categoryIndex) in skills.skills"
      :key="category.category"
      class=""
      :ref="(el) => (categoryRefs[categoryIndex] = el)"
    >
      <h3 class="skills__category-title--mobile">{{ category.category }}</h3>
      <article
        class="card skills__item"
        :style="
          categoryIndex % 2 === 0
            ? 'margin-right: auto;'
            : 'flex-direction: row-reverse; margin-left: auto;'
        "
      >
        <div class="skills__center">
          <h3 class="skills__category-title" tabindex="0">{{ category.category }}</h3>
        </div>
        <div class="skills__category">
          <div></div>

          <div class="skills__orbit">
            <div
              v-for="(skill, index) in category.items"
              :key="skill.name"
              :id="`skill-${categoryIndex}-${index}`"
              class="skills__circle"
            >
              <span class="skills__item-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.skills {
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    gap: 2rem;
  }

  .skills__item {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    overflow: hidden;
    background-color: vars.$secondary-light;
    transition: all 0.5s ease-in-out;
    // position: relative;

    &:hover {
      transform: scale(1.05);
    }

    @include mix.dark-mode {
      background-color: vars.$secondary-dark;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  &__category {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 350px;
    background-color: #666;
  }

  &__center {
    position: relative;
    z-index: 10;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    @media screen and (max-width: 768px) {
      width: auto;
      height: auto;
    }
  }

  &__category-title {
    color: vars.$primary-light;
    font-size: vars.$font-size-xl;
    font-weight: 700;
    text-align: center;
    padding: 1rem;
    position: relative;

    &:before {
      @include mix.right-circles;
    }

    &--mobile {
      display: none;
      font-size: 1.5rem;
      margin-bottom: 1rem;

      @media screen and (max-width: 640px) {
        display: block;
      }
    }
    @media screen and (max-width: 640px) {
      display: none;
    }
  }

  &__orbit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__circle {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: vars.$primary-light;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -3px -3px 10px vars.$secondary-light inset;
    transition: background-color 0.3s ease;
  }

  &__item-name {
    font-weight: 500;
    font-size: vars.$font-size-sm;
    text-align: center;
    color: #fff;
    padding: 0.5rem;

    @include mix.dark-mode {
      color: vars.$secondary-light;
    }
  }
}
</style>
