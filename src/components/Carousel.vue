<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, onMounted, PropType, ref, useTemplateRef } from "vue";
import { sleep } from "../utils/common";

export interface Slide {
  title: string;
  description: string;
  image: string;
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  itemsToShow: {
    type: Number,
    default: 1,
  },
  itemsToScroll: {
    type: Number,
    default: 1,
  },
  slides: {
    type: Array as PropType<Slide[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  wrapAround: {
    type: Boolean,
    default: false,
  },
  transitionDuration: {
    type: Number,
    default: 300,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  mouseDrag: {
    type: Boolean,
    default: true,
  },
  touchDrag: {
    type: Boolean,
    default: true,
  },
  pauseAutoPlayOnHover: {
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

onMounted(() => {
  slideTo(props.modelValue);
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

    if (transition) {
      slidesRef.value.style.transition = `transform ${props.transitionDuration}ms`;
    } else {
      slidesRef.value.style.transition = "none";
    }

    slidesRef.value.style.transform = `translateX(-${
      translate * (index + 1)
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
    <h2 class="text-2xl">{{ title }}</h2>

    <!-- Slides -->
    <div
      ref="slides"
      class="flex items-center overflow-x-auto"
      :style="{ width: `${100 * Object.keys(displayedSlides).length}%` }"
    >
      <div
        v-for="(s, index) of displayedSlides"
        :key="index"
        class="p-11 bg-neutral-800 text-center"
        :style="{ width: `${100 / Object.keys(displayedSlides).length}%` }"
      >
        <h3>{{ s.title }}</h3>
        <p>{{ s.description }}</p>
      </div>
    </div>

    <!-- Chevron prev/next -->
    <div>
      <button
        v-if="props.touchDrag && (props.wrapAround || currentSlide > 0)"
        class="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer bg-transparent border-none outline-none"
        @click="prev()"
      >
        <ChevronLeft :size="32" />
      </button>
      <button
        v-if="
          props.touchDrag &&
          (props.wrapAround || currentSlide < props.slides.length - 1)
        "
        class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-transparent border-none outline-none"
        @click="next()"
      >
        <ChevronRight :size="32" />
      </button>
    </div>

    <!-- Addons slot -->
    <slot name="addons">
      <div class="absolute bottom-0 w-full flex justify-center gap-2 pt-4 pb-2">
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
