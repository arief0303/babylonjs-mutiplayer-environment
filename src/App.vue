<template>
  <div class="fullscreen-container">
    <button class="fullscreen-button" @click="toggleFullscreen">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
    </button>
    <BabylonScene />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue'

export default defineComponent({
  components: {
    BabylonScene,
  },
});
</script>