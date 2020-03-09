import deck from "../data/deck";

/**
 *
 */
AFRAME.registerComponent("slide", {
  schema: {
    show: { type: "int", default: 0 }
  },

  update: function(oldData) {
    const { show } = this.data;

    if (show === oldData.show) return;

    // Clear out slide
    this.el.innerHTML = "";

    let y = 0;

    // Render new slide
    const slide = deck.slides[show];
    for (const element of slide) {
      const slideElement = document.createElement("a-entity");
      slideElement.setAttribute("text-geometry", {
        value: element.content,
        font: "#optimerBoldFont"
      });
      slideElement.setAttribute("position", `0 ${y} 0`);

      this.el.appendChild(slideElement);

      y -= 0.75;
    }
  }
});
