import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onBeforeUnmount } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  let animations = []
  let scrollTriggers = []

  const fadeIn = (element, delay = 0, duration = 1) => {
    const anim = gsap.from(element, {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out',
    })
    animations.push(anim)
    return anim
  }

  const fadeInUp = (element, delay = 0, duration = 1, distance = 40) => {
    const anim = gsap.from(element, {
      y: distance,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
    })
    animations.push(anim)
    return anim
  }

  const fadeInDown = (element, delay = 0, duration = 1, distance = 40) => {
    const anim = gsap.from(element, {
      y: -distance,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
    })
    animations.push(anim)
    return anim
  }

  const fadeInLeft = (element, delay = 0, duration = 1, distance = 40) => {
    const anim = gsap.from(element, {
      x: -distance,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
    })
    animations.push(anim)
    return anim
  }

  const fadeInRight = (element, delay = 0, duration = 1, distance = 40) => {
    const anim = gsap.from(element, {
      x: distance,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
    })
    animations.push(anim)
    return anim
  }

  const staggerFadeIn = (elements, delay = 0, stagger = 0.1, duration = 1) => {
    const anim = gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    })
    animations.push(anim)
    return anim
  }

  const scrollFadeIn = (element, options = {}) => {
    const defaults = {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      persist: false,
    }

    const config = { ...defaults, ...options }

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      toggleActions: config.toggleActions,
      onEnter: () => {
        gsap.fromTo(
          element,
          { y: config.y, opacity: 0 },
          { y: 0, opacity: 1, duration: config.duration, ease: config.ease },
        )
      },
      onLeave: () => {
        if (config.toggleActions.includes('reverse') && !config.persist) {
          gsap.to(element, {
            y: config.y,
            opacity: 0,
            duration: config.duration,
            ease: config.ease,
          })
        }
      },
      onEnterBack: () => {
        if (config.toggleActions.includes('play')) {
          gsap.to(element, { y: 0, opacity: 1, duration: config.duration, ease: config.ease })
        }
      },
      onLeaveBack: () => {
        if (config.toggleActions.includes('reverse') && !config.persist) {
          gsap.to(element, {
            y: config.y,
            opacity: 0,
            duration: config.duration,
            ease: config.ease,
          })
        }
      },
    })

    scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  const scrollStagger = (elements, options = {}) => {
    const defaults = {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }

    const config = { ...defaults, ...options }

    const scrollTrigger = ScrollTrigger.create({
      trigger: elements[0]?.parentElement || elements[0],
      start: config.start,
      end: config.end,
      toggleActions: config.toggleActions,
      onEnter: () => {
        gsap.fromTo(
          elements,
          { y: config.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
          },
        )
      },
      onLeave: () => {
        if (config.toggleActions.includes('reverse')) {
          gsap.to(elements, {
            y: config.y,
            opacity: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
          })
        }
      },
      onEnterBack: () => {
        if (config.toggleActions.includes('play')) {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
          })
        }
      },
      onLeaveBack: () => {
        if (config.toggleActions.includes('reverse')) {
          gsap.to(elements, {
            y: config.y,
            opacity: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
          })
        }
      },
    })

    scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  const parallaxEffect = (element, options = {}) => {
    const defaults = {
      speed: 0.5,
      direction: 'y',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }

    const config = { ...defaults, ...options }

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      onUpdate: (self) => {
        const progress = self.progress
        const distance = progress * 100 * config.speed

        if (config.direction === 'y') {
          gsap.set(element, { y: distance })
        } else if (config.direction === 'x') {
          gsap.set(element, { x: distance })
        }
      },
    })

    scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  const textReveal = (element, delay = 0, stagger = 0.05) => {
    const text = element.textContent
    element.textContent = ''

    const chars = text.split('').map((char) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.whiteSpace = 'pre'
      span.textContent = char
      element.appendChild(span)
      return span
    })

    const anim = gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger,
      delay,
      duration: 0.5,
      ease: 'power3.out',
    })

    animations.push(anim)
    return anim
  }

  const scaleOnScroll = (element, scaleFactor = 1.3, options = {}) => {
    const defaults = {
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      toggleActions: 'play none none reverse',
    }

    const config = { ...defaults, ...options }

    gsap.set(element, {
      transformOrigin: 'center center',
    })

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      toggleActions: config.toggleActions,
      scrub: config.scrub,
      onEnter: () => {
        gsap.to(element, {
          scale: scaleFactor,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
      onLeave: () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.in',
        })
      },
      onEnterBack: () => {
        gsap.to(element, {
          scale: scaleFactor,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.in',
        })
      },
    })

    scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  const moveShadow = (element, distance = 20, options = {}) => {
    const defaults = {
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      toggleActions: 'play none none reverse',
    }

    const initialDistance = 4

    const config = { ...defaults, ...options }

    gsap.set(element, {
      boxShadow: `${initialDistance}px ${initialDistance}px 0 rgba(0, 0, 0, 0.5)`,
    })

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      toggleActions: config.toggleActions,
      scrub: config.scrub,
      onEnter: () => {
        gsap.to(element, {
          boxShadow: `${distance}px ${distance}px 0 rgba(0, 0, 0, 0.5)`,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
      onLeave: () => {
        gsap.to(element, {
          boxShadow: `${initialDistance}px ${initialDistance}px 0 rgba(0, 0, 0, 0.5)`,
          duration: 0.5,
          ease: 'power2.in',
        })
      },
      onEnterBack: () => {
        gsap.to(element, {
          boxShadow: `${distance}px ${distance}px 0 rgba(0, 0, 0, 0.5)`,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        gsap.to(element, {
          boxShadow: `${initialDistance}px ${initialDistance}px 0 rgba(0, 0, 0, 0.5)`,
          duration: 0.5,
          ease: 'power2.in',
        })
      },
    })

    scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  const cleanup = () => {
    animations.forEach((anim) => {
      if (anim && anim.kill) anim.kill()
    })

    scrollTriggers.forEach((trigger) => {
      if (trigger && trigger.kill) trigger.kill()
    })

    animations = []
    scrollTriggers = []
  }

  onMounted(() => {
    ScrollTrigger.refresh()
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    staggerFadeIn,
    scrollFadeIn,
    scrollStagger,
    parallaxEffect,
    textReveal,
    scaleOnScroll,
    moveShadow,
    cleanup,
  }
}
