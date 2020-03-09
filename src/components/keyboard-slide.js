AFRAME.registerComponent("keyboard-slide", {
  init() {
    window.addEventListener("keypress", event => {
      if (event.key === "n") {
        AFRAME.scenes[0].emit("nextSlide");
      } else if (event.key === "p") {
        AFRAME.scenes[0].emit("prevSlide");
      }
    });
  }
});
