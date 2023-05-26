<script>
import { BeakerIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid';
export default {
    components: { BeakerIcon, Cog6ToothIcon }
}
</script>

<template>
    <div>
        <beaker-icon class="icon"/>
        <cog-6-tooth-icon class="icon"/>
    </div>
</template>

<style>
.icon {
    width: 36px;
    height: 36px;
    color: #222;
    margin-left: 12px;
    right: 0;
    bottom: 0;
    z-index: 100;
}
</style>