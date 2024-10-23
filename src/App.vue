<script setup lang="ts">
import { ref } from "vue";
import Carousel from "./components/Carousel.vue";

const slides = ref<string[]>([
  "Slide 1 description",
  "Slide 2 description fbhdj bfh dsfbhds jfb hdsjfdsb hjfk dsbhfj kds fbdsjk bh dsjkfds bhfkj dsf bhjdskf sh jdk dshbj fk bdsjkf dsf ijsd gyhdjs ",
  "Slide 3 description",
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
          <p>{{ s }}</p>
        </div>
      </template>
    </Carousel>
  </div>
</template>
