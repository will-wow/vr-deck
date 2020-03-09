AFRAME.registerComponent("voice-player", {
  schema: {
    play: { type: "boolean", default: false }
  },
  update(oldData) {
    const { play } = this.data;
    if (oldData.play !== this.data.play) {
      if (play) {
        this.el.components.sound.playSound();
      } else {
        this.el.components.sound.stopSound();
      }
    }
  }
});
