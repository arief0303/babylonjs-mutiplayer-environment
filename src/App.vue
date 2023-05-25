<template>
  <div class="fullscreen-container">
    <canvas ref="canvas"></canvas>
    <button class="fullscreen-button" @click="toggleFullscreen">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
    </button>
    <div style="clip-path:polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" class="
        m-3
        cursor-pointer
        bg-panelDefault
        absolute
        sm:h-[51px] lg:h-[83px]
        
      "><div style="clip-path:polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));background-image:url('/images/profile.png')" class="
            sm:w-[51px]
            lg:w-[83px]
            sm:h-[51px]
            lg:h-[83px]
            bg-white/10
            bg-contain
            inline-block
          "></div><div class="
          align-top sm:px-3 lg:px-3 sm:py-1.5 lg:py-3
          inline-block
        "><p class="font-normal sm:text-14 lg:text-16 text-white block sm:mb-0 lg:mb-1">Guest</p><h4 class="font-bold sm:text-16 lg:text-24 text-secondary block"><img src="/assets/bitapoint.svg" alt="Bitapoint" class="inline-block sm:h-4 lg:h-8">12.000</h4></div></div>
  </div>
</template>

<script src="./components/main.js"></script>

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