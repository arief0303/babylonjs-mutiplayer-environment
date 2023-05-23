
export default {
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
  },
  methods: {
    toggleFullscreen() {
      const doc = window.document;
      const docEl = doc.documentElement;

      const requestFullscreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      const exitFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        if (this.canvas.requestFullscreen) {
          this.canvas.requestFullscreen();
        } else if (this.canvas.mozRequestFullScreen) {
          this.canvas.mozRequestFullScreen();
        } else if (this.canvas.webkitRequestFullScreen) {
          this.canvas.webkitRequestFullScreen();
        } else if (this.canvas.msRequestFullscreen) {
          this.canvas.msRequestFullscreen();
        }
      } else {
        if (exitFullscreen) {
          exitFullscreen.call(doc);
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    }
  }
};
