<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const backgroundRef = ref(null)
const toggleBodyRef = ref(null)
const toggleBtnRef = ref(null)
const navItems = [
  { id: 'welcome', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const activeSection = ref('welcome')

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const isToggled = ref(themeStore.isDark)

watch(
  () => themeStore.isDark,
  (newValue) => {
    isToggled.value = newValue
  },
)

const handleToggle = () => {
  themeStore.toggleTheme()
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    themeStore.toggleTheme()
  }
}

const navigateToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    activeSection.value = id
    closeMobileMenu()
  }
}

const handleScroll = () => {
  const sections = navItems
    .map((item) => {
      const element = document.getElementById(item.id)
      if (!element) return null

      const rect = element.getBoundingClientRect()
      return {
        id: item.id,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
      }
    })
    .filter(Boolean)

  const headerHeight = 80

  let maxVisibleSection = null
  let maxVisibleArea = 0

  for (const section of sections) {
    const viewportHeight = window.innerHeight
    const visibleTop = Math.max(section.top, headerHeight)
    const visibleBottom = Math.min(section.bottom, viewportHeight)

    if (visibleBottom > visibleTop) {
      const visibleArea = visibleBottom - visibleTop

      if (visibleArea > maxVisibleArea || (section.id === 'welcome' && section.top > -100)) {
        maxVisibleArea = visibleArea
        maxVisibleSection = section.id
      }
    }
  }

  if (maxVisibleSection) {
    activeSection.value = maxVisibleSection
  }
}

onMounted(() => {
  isToggled.value = themeStore.isDark
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="layout">
    <div ref="backgroundRef" class="background" :class="{ 'background--on': isToggled }"></div>

    <header class="layout__header" role="banner">
      <div class="container">
        <h1 class="layout__title" tabindex="1">Mini portfolio</h1>

        <!-- Desktop navigation -->
        <nav class="layout__nav desktop-only" aria-label="Main navigation">
          <ul class="layout__nav-list">
            <li v-for="(item, index) in navItems" :key="item.id" class="layout__nav-item">
              <a
                @click.prevent="navigateToSection(item.id)"
                :href="`#${item.id}`"
                class="layout__nav-link"
                :tabindex="index + 2"
                :aria-current="activeSection === item.id ? 'page' : undefined"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="toggle desktop-only">
          <label for="theme-toggle" class="toggle__label">
            <span class="sr-only">Toggle dark mode</span>
            <div ref="toggleBodyRef" class="toggle-body" :class="{ 'toggle-body--on': isToggled }">
              <button
                id="theme-toggle"
                ref="toggleBtnRef"
                type="button"
                class="toggle-btn"
                tabindex="0"
                :class="{
                  'toggle-btn--on': isToggled,
                  'toggle-btn--scale': isToggled,
                }"
                :aria-label="isToggled ? 'Switch to light mode' : 'Switch to dark mode'"
                :aria-pressed="isToggled ? 'true' : 'false'"
                @click="handleToggle"
                @keydown="handleKeyPress"
              ></button>
            </div>
          </label>
        </div>

        <!-- Mobile menu button -->
        <button
          class="hamburger-menu mobile-only"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <div
        id="mobile-menu"
        class="mobile-menu"
        :class="{ 'mobile-menu--open': isMobileMenuOpen }"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div class="mobile-menu__container">
          <ul class="mobile-menu__nav-list">
            <li v-for="(item, index) in navItems" :key="item.id" class="mobile-menu__nav-item">
              <a
                @click.prevent="navigateToSection(item.id)"
                :href="`#${item.id}`"
                class="mobile-menu__nav-link"
                :tabindex="isMobileMenuOpen ? index + 2 : -1"
                :aria-current="activeSection === item.id ? 'page' : undefined"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <div class="mobile-menu__toggle">
            <span class="mobile-menu__toggle-label">Theme</span>
            <label for="mobile-theme-toggle" class="toggle__label">
              <span class="sr-only">Toggle dark mode</span>
              <div class="toggle-body" :class="{ 'toggle-body--on': isToggled }">
                <button
                  id="mobile-theme-toggle"
                  type="button"
                  class="toggle-btn"
                  :tabindex="isMobileMenuOpen ? 0 : -1"
                  :class="{
                    'toggle-btn--on': isToggled,
                    'toggle-btn--scale': isToggled,
                  }"
                  :aria-label="isToggled ? 'Switch to light mode' : 'Switch to dark mode'"
                  :aria-pressed="isToggled ? 'true' : 'false'"
                  @click="handleToggle"
                  @keydown="handleKeyPress"
                ></button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </header>

    <main class="layout__main" role="main">
      <slot></slot>
    </main>

    <footer class="layout__footer" role="contentinfo">
      <div class="container">
        <div class="layout__footer-content">
          <p class="layout__copyright">2025, Juan Daniel Castañeda.</p>
          <div class="layout__social-links">
            <a
              href="https://www.linkedin.com/in/juandcpuello/"
              target="_blank"
              rel="noopener noreferrer"
              class="layout__social-link"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/DPuello"
              target="_blank"
              rel="noopener noreferrer"
              class="layout__social-link"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@use 'sass:color';
@use '@/assets/scss/variables' as vars;
@use '@/assets/scss/mixins' as mixins;

$animtime: 1.5s;
$easing: cubic-bezier(0.68, -0.15, 0.265, 1.35);

$breakpoint-sm: 640px;

.desktop-only {
  @media (max-width: $breakpoint-sm) {
    display: none !important;
  }
}

.mobile-only {
  @media (min-width: #{$breakpoint-sm + 1px}) {
    display: none !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &__header {
    position: fixed;
    width: 100%;
    padding: 1rem;
    background-color: rgba(vars.$primary-light, 0.5);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 50;
    backdrop-filter: blur(3px);

    .container {
      @include mixins.flex-between;
      width: 100%;
    }

    @include mixins.dark-mode {
      background-color: rgba(vars.$secondary-dark, 0.5);
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  &__nav {
    display: flex;
    align-items: center;

    &-list {
      display: flex;
      gap: 1.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &-item {
      position: relative;
    }

    &-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
      padding: 0.5rem 0;
      position: relative;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: white;
        transition: width 0.3s;
      }

      &:hover::after,
      &:focus::after,
      &[aria-current='page']::after {
        width: 100%;
      }

      &:focus-visible {
        outline: 2px solid white;
        outline-offset: 4px;
      }
    }
  }

  &__main {
    flex: 1;
    padding-top: 5rem;
  }

  &__footer {
    background-color: vars.$gray-100;
    padding: 2rem 0;
    margin-top: auto;

    @include mixins.dark-mode {
      background-color: #0005;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }

  &__social {
    &-links {
      display: flex;
      gap: 1rem;
    }

    &-link {
      color: vars.$text-light;
      text-decoration: none;
      transition: color 0.2s;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: currentColor;
        transition: width 0.3s;
      }

      &:hover::after,
      &:focus::after {
        width: 100%;
      }

      &:focus-visible {
        outline: 2px solid vars.$primary-light;
        outline-offset: 2px;
      }

      @include mixins.dark-mode {
        color: vars.$text-dark;

        &:focus-visible {
          outline-color: vars.$primary-dark;
        }
      }

      &:hover {
        color: vars.$primary-light;

        @include mixins.dark-mode {
          color: vars.$primary-dark;
        }
      }
    }
  }
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: 1.5s $easing;

  &--on {
    transition: 1.5s $easing;
  }
}

.toggle {
  position: relative;
  display: flex;
  align-items: center;

  &__label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.toggle-body {
  width: 3rem;
  height: 1rem;
  position: relative;
  background: white;
  border-radius: 2rem;
  cursor: pointer;

  &--on {
    animation: angle $animtime $easing;
    animation-direction: alternate;
  }

  &:not(.toggle-body--on) {
    animation: angle-reverse $animtime $easing;
  }
}

.toggle-btn {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  top: calc(50% - 1.2rem / 2);
  left: calc(27% - 1.6rem / 2);
  border-radius: 2rem;
  background: vars.$secondary-dark;
  cursor: pointer;
  border: none;
  transform: translateX(0);
  transition: $animtime $easing;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: #{$breakpoint-sm}) {
    border: 2px solid white !important;
  }
  &--on {
    transition: $animtime $easing;
    transform: translateX(150%);
    background: vars.$primary-light;
  }

  &--scale {
    transform: translateX(150%) scale(1.1);
  }
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 60;

  .hamburger-line {
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100dvh;
  background-color: #333c;
  z-index: 55;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  backdrop-filter: blur(100px);

  @include mixins.dark-mode {
    background-color: #000d;
  }

  &--open {
    transform: translateX(0);
  }

  &__container {
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
  }

  &__nav-item {
    margin-bottom: 1.5rem;
  }

  .mobile-menu__nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    display: block;
    position: relative;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    &[aria-current='page'] {
      background-color: #fff2;
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
    }
  }

  &__toggle {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    &-label {
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}

@keyframes angle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes angle-reverse {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
