<template>
  <div class="fullscreen-container">
    <canvas ref="canvas"></canvas>
    <button class="fullscreen-button" @click="toggleFullscreen">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
    </button>
  </div>
</template>

<script src="./components/Game.js"></script>

<style>
.fullscreen-container {
  position: relative;
}

.fullscreen-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  bottom: 5vh;
  right: 5vw;
}

.fullscreen-button:hover {
  background-color: #45a049;
}

.fullscreen-button:focus {
  outline: none;
}

</style>