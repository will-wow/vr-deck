AFRAME.registerComponent("highlight-able", {
  schema: {
    line: { type: "int" }
  },
  init() {
    this.el.addEventListener("mouseenter", () => {
      AFRAME.scenes[0].emit("highlight", { line: this.data.line });
    });

    this.el.addEventListener("mouseleave", () => {
      AFRAME.scenes[0].emit("highlight", { line: -1 });
    });
  }
});
