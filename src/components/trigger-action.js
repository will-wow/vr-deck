import { emit } from "../lib/action";

/**
 * Trigger a an action from an event
 */
AFRAME.registerComponent("trigger-action", {
  schema: {
    action: { type: "string" },
    event: { type: "string", default: "click" }
  },

  init: function() {
    const { action, event } = this.data;
    const el = this.el;

    el.addEventListener(event, _e => {
      emit(action);
    });
  }
});
