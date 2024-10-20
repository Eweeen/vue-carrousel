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
    description:
      "Slide 2 description fbhdj bfh dsfbhds jfb hdsjfdsb hjfk dsbhfj kds fbdsjk bh dsjkfds bhfkj dsf bhjdskf sh jdk dshbj fk bdsjkf dsf ijsd gyhdjs ",
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
  <div class="w-full h-screen bg-neutral-900 text-gray-200 p-12">
    <h1 class="text-3xl font-semibold mb-6">Vue Carousel</h1>

    <Carousel
      :slides
      :wrap-around="true"
      :auto-play="true"
      :mouse-drag="false"
    />
  </div>
</template>
