<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import {
  computed,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  useTemplateRef,
} from "vue";
import { sleep } from "../utils/common";
import { usePointerSwipe } from "@vueuse/core";

export interface Slide {
  title: string;
  description: string;
}

const props = defineProps({
  /**
   * Position par défaut du carousel
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * Nombre de slides à afficher
   */
  itemsToShow: {
    type: Number,
    default: 1,
  },
  /**
   * Nombre de slides à scroller
   */
  itemsToScroll: {
    type: Number,
    default: 1,
  },
  /**
   * Slides à afficher
   */
  slides: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  /**
   * Active ou non l'effet de boucle
   */
  wrapAround: {
    type: Boolean,
    default: false,
  },
  /**
   * Durée de la transition
   */
  transitionDuration: {
    type: Number,
    default: 300,
  },
  /**
   * Active ou non le défilement automatique
   */
  autoPlay: {
    type: Boolean,
    default: false,
  },
  /**
   * Intervalle de temps entre chaque slide
   */
  autoPlayInterval: {
    type: Number,
    default: 5000,
  },
  /**
   * Active ou non la pause du défilement automatique au survol
   */
  pauseAutoPlayOnHover: {
    type: Boolean,
    default: true,
  },
  /**
   * Active ou non la navigation au clavier
   */
  arrowKeys: {
    type: Boolean,
    default: true,
  },
  /**
   * Active ou non le swipe
   */
  touchDrag: {
    type: Boolean,
    default: true,
  },
});

const carousel = useTemplateRef<HTMLDivElement>("carousel");
const slidesRef = useTemplateRef<HTMLDivElement>("slides");

const currentSlide = ref<number>(0);
const displayedSlides = computed<Record<number, Slide>>(() => {
  if (props.slides.length < 2) {
    return { 0: props.slides[0] };
  }

  if (!props.wrapAround) {
    return {
      ...props.slides.reduce((acc, s, index) => {
        acc[index] = s;
        return acc;
      }, {} as Record<number, Slide>),
    };
  }

  // Ajoute les slides de début et de fin pour l'effet de boucle
  return {
    0: props.slides[props.slides.length - 1],
    ...props.slides.reduce((acc, s, index) => {
      acc[index + 1] = s;
      return acc;
    }, {} as Record<number, Slide>),
    [props.slides.length + 1]: props.slides[0],
  };
});

const interval = ref<number | undefined>(undefined);

onMounted(() => {
  slideTo(props.modelValue);

  if (props.autoPlay) {
    interval.value = setInterval(() => {
      next();
    }, props.autoPlayInterval);

    if (props.pauseAutoPlayOnHover && carousel.value) {
      carousel.value.addEventListener("mouseenter", () => {
        clearInterval(interval.value);
      });

      carousel.value.addEventListener("mouseleave", () => {
        interval.value = setInterval(() => {
          next();
        }, props.autoPlayInterval);
      });
    }
  }
});

onUnmounted(() => {
  if (props.autoPlay) {
    clearInterval(interval.value);

    if (props.pauseAutoPlayOnHover && carousel.value) {
      carousel.value.removeEventListener("mouseenter", () => {
        clearInterval(interval.value);
      });

      carousel.value.removeEventListener("mouseleave", () => {
        clearInterval(interval.value);
      });
    }
  }
});

const { direction, distanceX } = usePointerSwipe(slidesRef, {
  onSwipe() {
    if (slidesRef.value) {
      const slideValue = 100 / Object.keys(displayedSlides.value).length;
      const indexToSlide =
        props.slides.length < 2 || !props.wrapAround
          ? currentSlide.value
          : currentSlide.value + 1;
      const translate = `translateX(-${slideValue * indexToSlide}%)`;

      slidesRef.value.style.transition = "none";

      if (direction.value === "right") {
        const reverseSign = Math.sign(distanceX.value) * distanceX.value;
        slidesRef.value.style.transform = `translateX(${reverseSign}px) ${translate}`;
      } else {
        slidesRef.value.style.transform = `translateX(-${distanceX.value}px) ${translate}`;
      }
    }
  },
  onSwipeEnd() {
    if (direction.value === "left") {
      next();
    } else {
      prev();
    }
  },
});

/**
 * Déplace le carousel à la slide donnée
 *
 * @param {number} index - Index de la slide
 * @param {boolean} transition - Transition ou non
 * @returns {void}
 */
function slideTo(index: number, transition: boolean = false): void {
  if (slidesRef.value) {
    currentSlide.value = index; // Réassigne pour les cliques sur les points

    const translate = 100 / Object.keys(displayedSlides.value).length;
    const indexToSlide =
      props.slides.length < 2 || !props.wrapAround ? index : index + 1;

    if (transition) {
      slidesRef.value.style.transition = `transform ${props.transitionDuration}ms`;
    } else {
      slidesRef.value.style.transition = "none";
    }

    slidesRef.value.style.transform = `translateX(-${
      translate * indexToSlide
    }%)`;
  }
}

/**
 * Slide suivante
 */
function next(): void {
  // Retour à la première slide
  if (currentSlide.value === props.slides.length - 1) {
    goToFirstSlide();
    return;
  }

  // Slide suivante
  currentSlide.value++;

  if (currentSlide.value >= props.slides.length) {
    currentSlide.value = 0;
  }

  slideTo(currentSlide.value, true);
}

/**
 * Slide précédente
 */
function prev(): void {
  // Retour à la dernière slide
  if (currentSlide.value === 0) {
    goToLastSlide();
    return;
  }

  // Slide précédente
  currentSlide.value--;

  if (currentSlide.value < 0) {
    currentSlide.value = props.slides.length - 1;
  }

  slideTo(currentSlide.value, true);
}

/**
 * Retourne à la première slide
 */
async function goToFirstSlide(): Promise<void> {
  currentSlide.value++;

  slideTo(currentSlide.value, true);
  currentSlide.value = 0;

  await sleep(props.transitionDuration);
  slideTo(currentSlide.value, false);
}

/**
 * Retourne à la dernière slide
 */
async function goToLastSlide(): Promise<void> {
  currentSlide.value--;

  slideTo(currentSlide.value, true);
  currentSlide.value = props.slides.length - 1;

  await sleep(props.transitionDuration);
  slideTo(currentSlide.value, false);
}
</script>

<template>
  <div
    ref="carousel"
    class="relative w-full max-w-[800px] mx-auto bg-neutral-800 rounded-lg overflow-hidden"
  >
    <!-- Slides -->
    <div
      ref="slides"
      class="flex items-center overflow-x-auto select-none"
      :style="{ width: `${100 * Object.keys(displayedSlides).length}%` }"
    >
      <div
        v-for="(s, index) of displayedSlides"
        :key="index"
        :style="{ width: `${100 / Object.keys(displayedSlides).length}%` }"
      >
        <slot name="slide" :s="s">
          <div class="p-11 bg-neutral-800 text-center select-none">
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </div>
        </slot>
      </div>
    </div>

    <!-- Chevron prev/next -->
    <div>
      <button
        v-if="props.arrowKeys && (props.wrapAround || currentSlide > 0)"
        class="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer bg-transparent border-none outline-none"
        @click="prev()"
      >
        <ChevronLeft :size="32" />
      </button>
      <button
        v-if="
          props.arrowKeys &&
          (props.wrapAround || currentSlide < props.slides.length - 1)
        "
        class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-transparent border-none outline-none"
        @click="next()"
      >
        <ChevronRight :size="32" />
      </button>
    </div>

    <!-- Addons slot -->
    <slot name="addons" :slides>
      <div class="w-full flex justify-center gap-2 pb-4">
        <span
          v-for="(_s, index) of slides"
          :key="index"
          :class="[
            'w-2 h-2 mx-1 bg-gray-100 rounded-full cursor-pointer',
            { 'bg-neutral-700 border border-gray-100': index === currentSlide },
          ]"
          @click="slideTo(index, true)"
        ></span>
      </div>
    </slot>
  </div>
</template>
