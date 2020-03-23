import { emit } from "../lib/action";

AFRAME.registerComponent("highlight-able", {
  schema: {
    line: { type: "int" }
  },
  init() {
    this.el.addEventListener("mouseenter", () => {
      emit("highlight", { line: this.data.line });
    });

    this.el.addEventListener("mouseleave", () => {
      emit("highlight", { line: -1 });
    });
  }
});
