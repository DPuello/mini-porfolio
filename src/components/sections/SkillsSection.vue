<script setup>
import { ref, onMounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'
import Skills from '../Skills.vue'

const sectionRef = ref(null)
const titleRef = ref(null)
const skillsRef = ref(null)
const { scrollFadeIn } = useAnimations()

onMounted(() => {
  if (sectionRef.value) {
    scrollFadeIn(sectionRef.value, { y: 30 })
  }
})
</script>

<template>
  <section
    id="skills"
    ref="sectionRef"
    class="section section--skills section--alt"
    aria-labelledby="skills-title"
  >
    <div class="container">
      <h2 ref="titleRef" class="section__title skills-title" tabindex="0">My skills</h2>
      <div ref="skillsRef" class="skills">
        <Skills />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.section--skills {
  overflow: hidden;
  padding: 6rem 0;

  .skills-title {
    position: relative;
    display: inline-block;
    margin-bottom: 4rem;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background-color: vars.$bg-accent-light;
      border-radius: 2px;
    }
  }
}

.skills {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
