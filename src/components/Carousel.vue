<script setup lang="ts">
import { onMounted, PropType, ref, useTemplateRef } from "vue";

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
  snapAlign: {
    type: String,
    default: "center",
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
  direction: {
    type: String as PropType<"ltr" | "rtl">,
    default: "ltr",
  },
});

const carousel = useTemplateRef<HTMLDivElement>("carousel");
const slidesRef = useTemplateRef<HTMLDivElement>("slides");

const currentSlide = ref<number>(props.modelValue);

onMounted(() => {
  if (carousel.value) {
    console.log(carousel.value);
  }
});

function slideTo(index: number): void {
  currentSlide.value = index;

  if (slidesRef.value) {
    slidesRef.value.scrollTo({
      left: slidesRef.value.clientWidth * index,
      behavior: "smooth",
    });
  }
}

function next(): void {
  currentSlide.value++;

  if (currentSlide.value >= props.slides.length) {
    currentSlide.value = 0;
  }

  slideTo(currentSlide.value);
}

function prev(): void {
  currentSlide.value--;

  if (currentSlide.value < 0) {
    currentSlide.value = props.slides.length - 1;
  }

  slideTo(currentSlide.value);
}
</script>

<template>
  <div ref="carousel" id="carousel">
    <h2>{{ title }}</h2>

    <div ref="slides" id="slides">
      <div v-for="(s, index) of slides" :key="index" class="slide">
        <h3>{{ s.title }}</h3>
        <p>{{ s.description }}</p>
      </div>
    </div>

    <div>
      <button id="prev-slide" @click="prev()"><</button>
      <button id="next-slide" @click="next()">></button>
    </div>

    <slot name="addons">
      <div class="addons">
        <span
          v-for="(_s, index) of slides"
          :key="index"
          :class="{ addon: true, current: index === currentSlide }"
          @click="slideTo(index)"
        ></span>
      </div>
    </slot>
  </div>
</template>

<style>
#carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

#prev-slide {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 32px;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
}

#next-slide {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 32px;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
}

#carousel #slides {
  width: 100%;
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

#carousel #slides::-webkit-scrollbar {
  display: none;
}

#carousel #slides .slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  padding: 48px;
  background: #262626;
  color: #fff;
  text-align: center;
}

#carousel .addons {
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 0px 8px;
  width: 100%;
  bottom: 0;
}

#carousel .addons .addon {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}

#carousel .addons .addon.current {
  background: #404040;
  border: 1px solid #fff;
}
</style>
