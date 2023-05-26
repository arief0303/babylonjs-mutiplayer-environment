<script>
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue'
import { BeakerIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  components: {
    BabylonScene,
    BeakerIcon,
    Cog6ToothIcon
  },
  setup() {
    /* isFullscreen: false,
      toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }, */
    /* const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;

      if (isFullscreen.value) {
        // Enter fullscreen mode
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen mode
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }; */
  }
});
</script>

<template>
  <div class="fullscreen-container">
    <!-- <button class="fullscreen-button" @click="toggleFullscreen">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
    </button> -->
    <BabylonScene />
  </div>
  <!-- <BeakerIcon class="icon" /> -->
  <!-- <button @click="toggleFullscreen" class="icon">
    <Cog6ToothIcon class="icon" />
  </button> -->
  <button class="fullscreen-button" @click="toggleFullscreen">
    <!-- {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }} -->
    <Cog6ToothIcon class="icon" />
  </button>
</template>

<style>
.icon {
  width: 36px;
  height: 36px;
  color: #222;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 15px;
}
</style>