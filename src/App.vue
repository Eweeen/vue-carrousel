<script setup lang="ts">
import { ref } from "vue";
import Carousel, { Slide } from "./components/Carousel.vue";

const slides = ref<Slide[]>([
  {
    title: "Slide 1",
    description: "Slide 1 description",
    image: "https://picsum.photos/800/400?image=1",
  },
  {
    title: "Slide 2",
    description: "Slide 2 description",
    image: "https://picsum.photos/800/400?image=2",
  },
  {
    title: "Slide 3",
    description: "Slide 3 description",
    image: "https://picsum.photos/800/400?image=3",
  },
]);
</script>

<template>
  <section>
    <h1>Vue Carousel</h1>

    <Carousel :slides />
  </section>
</template>

<style>
section {
  padding: 40px;
}

section h1 {
  margin-bottom: 32px;
}
</style>
