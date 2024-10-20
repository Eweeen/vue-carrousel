<script setup lang="ts">
import { ref } from "vue";
import Carousel, { Slide } from "./components/Carousel.vue";

const slides = ref<Slide[]>([
  {
    title: "Slide 1",
    description: "Slide 1 description",
  },
  {
    title: "Slide 2",
    description:
      "Slide 2 description fbhdj bfh dsfbhds jfb hdsjfdsb hjfk dsbhfj kds fbdsjk bh dsjkfds bhfkj dsf bhjdskf sh jdk dshbj fk bdsjkf dsf ijsd gyhdjs ",
  },
  {
    title: "Slide 3",
    description: "Slide 3 description",
  },
]);
</script>

<template>
  <div
    class="w-full h-screen bg-gray-100 text-gray-800 dark:bg-neutral-900 dark:text-gray-100 p-12"
  >
    <h1 class="text-3xl font-semibold mb-6">Vue Carousel</h1>

    <Carousel :slides :wrap-around="true" :auto-play="true" :arrow-keys="true">
      <template #slide="{ s }">
        <div class="p-11 text-center select-none">
          <h3>{{ s.title }}</h3>
          <p>{{ s.description }}</p>
        </div>
      </template>
    </Carousel>
  </div>
</template>
