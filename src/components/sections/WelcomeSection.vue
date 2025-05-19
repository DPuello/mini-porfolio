<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimations } from '@/composables/useAnimations'

const sectionRef = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const textRef = ref(null)
const lottieRef = ref(null)
const bgImageRef = ref(null)
const { fadeIn, scaleOnScroll } = useAnimations()

const handleScroll = () => {
  if (bgImageRef.value) {
    const scrollY = window.scrollY

    const factor = scrollY * 0.0003

    const topLeftX = 1 - factor * 1.5
    const topLeftY = 1 + factor
    const topRightX = 1 + factor * 2
    const topRightY = 1 - factor * 0.8
    const bottomLeftX = 1 - factor
    const bottomLeftY = 1 + factor * 1.2

    bgImageRef.value.style.transform = `
      matrix3d(
        ${topLeftX}, 0, 0, 0,
        0, ${topLeftY}, 0, 0,
        ${topRightX}, ${topRightY}, 1, 0,
        ${bottomLeftX}, ${bottomLeftY}, 0, 1
      )
    `
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  if (sectionRef.value) {
    sectionRef.value.style.opacity = '0'
    setTimeout(() => {
      sectionRef.value.style.opacity = '1'
      sectionRef.value.style.transition = 'opacity 1s ease-out'
    }, 100)
  }

  if (subtitleRef.value) {
    subtitleRef.value.style.opacity = '0'
    subtitleRef.value.style.transform = 'translateY(20px)'
    setTimeout(() => {
      subtitleRef.value.style.opacity = '1'
      subtitleRef.value.style.transform = 'translateY(0)'
      subtitleRef.value.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
    }, 500)
  }

  if (textRef.value) {
    textRef.value.style.opacity = '0'
    textRef.value.style.transform = 'translateY(20px)'
    setTimeout(() => {
      textRef.value.style.opacity = '1'
      textRef.value.style.transform = 'translateY(0)'
      textRef.value.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
    }, 700)
  }

  if (lottieRef.value) {
    lottieRef.value.$el.style.opacity = '0'
    lottieRef.value.$el.style.transform = 'translateY(20px)'
    setTimeout(() => {
      lottieRef.value.$el.style.opacity = '1'
      lottieRef.value.$el.style.transform = 'translateY(0)'
      lottieRef.value.$el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
    }, 900)

    setTimeout(() => {
      scaleOnScroll(lottieRef.value.$el, 1.3, {
        start: 'top 70%',
        end: 'center 30%',
      })
    }, 1000)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section
    id="welcome"
    ref="sectionRef"
    class="section section--about section--welcome"
    aria-labelledby="welcome-title"
  >
    <div class="section__content">
      <h1 ref="titleRef" id="welcome-title" tabindex="0" class="welcome__title">
        I'm Juan Daniel Castañeda
      </h1>
      <p ref="subtitleRef" class="welcome__subtitle">Welcome to my portfolio!</p>
      <p ref="textRef" class="welcome__text">Take a look at the projects I've worked on.</p>
    </div>

    <figure class="welcome__figure">
      <img
        src="/images/Welcome.svg"
        width="300"
        height="300"
        loading="lazy"
        alt="Smiling character waving"
        class="welcome__image"
      />
    </figure>

    <img
      ref="bgImageRef"
      src="@/assets/bg_lines.svg"
      alt="Curved lines"
      loading="lazy"
      class="section__background"
      aria-hidden="true"
    />
  </section>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mix;

.section--welcome {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .welcome__title {
    transform-origin: center;
    will-change: transform;
  }

  .section__lottie {
    transform-origin: center;
    will-change: transform;
  }
}

.section--about {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  perspective: 1000px;

  .section__lottie {
    background-color: vars.$secondary-light;
    border: 1px solid vars.$gray-300;
    border-radius: 500px;
  }

  .section__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    max-width: 100%;
    padding: 1rem;
    gap: 0.5rem;
  }

  .welcome__figure {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .welcome__image {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .welcome__title {
    font-size: 2rem;
    font-weight: bold;
    color: vars.$primary-light;
    text-align: center;

    @include mix.dark-mode {
      color: #fff;
    }
  }
  .welcome__subtitle {
    background-color: vars.$secondary-light;
    border-radius: 100px;
    padding: 0.3rem 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: vars.$primary-light;
    text-align: center;
    margin: 0;
  }
  .welcome__text {
    max-width: 42rem;
    margin: 0 auto;
    color: vars.$text-light;
    line-height: 1.7;
    text-align: center;

    @include mix.dark-mode {
      color: vars.$text-dark;
    }
  }
  .section__background {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 900px;
    z-index: -1;
    opacity: 0.3;
    transition:
      transform 0.3s ease-out,
      opacity 0.5s ease;
    transform-origin: center;
    will-change: transform, opacity;

    @include mix.dark-mode {
      filter: invert(1);
    }
  }
}
</style>
