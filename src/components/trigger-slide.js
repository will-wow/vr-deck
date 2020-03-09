/**
 * Trigger a slide change on click
 */
AFRAME.registerComponent("trigger-slide", {
  schema: {
    action: { type: "string", default: "nextSlide" },
    event: { type: "string", default: "click" }
  },

  init: function() {
    const { action, event } = this.data;
    const el = this.el;

    el.addEventListener(event, _e => {
      AFRAME.scenes[0].emit(action);
    });
  }
});
