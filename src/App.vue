<script>
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue'
import { BeakerIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import './assets/main.css'

export default defineComponent({
  components: {
    BabylonScene,
    Cog6ToothIcon,
  }
});
</script>

<template>
  <div class="w-full p-4">
    <BabylonScene />
  </div>
</template>