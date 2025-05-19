<script setup>
import { ref, onMounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'
import LottieAbout from '@/assets/icons/LottieAbout.vue'

const sectionRef = ref(null)
const windowRef = ref(null)
const textRef = ref(null)
const { scrollFadeIn, textReveal, scaleOnScroll, moveShadow } = useAnimations()

onMounted(() => {
  if (sectionRef.value) {
    scrollFadeIn(sectionRef.value, { y: 30 })
    scaleOnScroll(sectionRef.value, 1.05, {
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

  if (textRef.value) {
    textReveal(textRef.value, 0.5)
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    role="region"
    class="section section--about"
    aria-labelledby="about-title"
  >
    <div ref="windowRef" class="window">
      <figure class="about__figure">
        <LottieAbout
          class="section__lottie"
          style="width: 300px; height: 300px"
          aria-hidden="true"
        />
      </figure>
      <div class="section__content">
        <h2 ref="textRef" id="about-title" tabindex="0" class="section__title">About me</h2>
        <p class="about__text">
          I'm a passionate developer focused on creating beautiful and functional web applications.
          With expertise in Vue.js and modern web technologies, I build responsive and accessible
          solutions that deliver exceptional user experiences.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.section--about {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;

  .window {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 80vw;

    @media screen and (max-width: 640px) {
      max-width: 100%;
    }
  }

  .about__figure {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .section__title {
    position: relative;
    &:before {
      @include mix.left-column;
    }
  }

  .section__lottie {
    background-color: vars.$secondary-light;
    border: 1px solid vars.$gray-300;
    border-radius: 500px;
  }

  .section__content {
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
  }

  .about__text {
    max-width: 42rem;
    margin: 0 auto;
    color: vars.$text-light;
    line-height: 1.7;
    text-align: center;

    @include mix.dark-mode {
      color: vars.$text-dark;
    }
  }
}
</style>
