import { getTalk } from "../store/talk";

/**
 *
 */
AFRAME.registerComponent("slide", {
  schema: {
    show: { type: "int", default: 0 }
  },

  init() {
    this.y = 0;
  },

  update: function(oldData) {
    const { show } = this.data;

    if (show === oldData.show) return;

    // Clear out slide
    this.el.innerHTML = "";

    this.y = 0;

    // Render new slide
    const { deck } = getTalk();
    if (deck) {
      const slide = deck.slides[show];
      console.log(slide, show);
      slide.forEach(this.renderLine, this);
    }
  },

  renderLine(element, i) {
    const slideElement = document.createElement("a-entity");

    slideElement.setAttribute("mixin", "slide__text");

    slideElement.setAttribute("highlight-able", {
      line: i
    });

    slideElement.setAttribute("highlight", {
      line: i,
      color: element.color || "white",
      highlightColor: element.highlightColor || "red"
    });

    const theme = getTalk().theme;
    const themeStyles = theme.styles[element.kind] || theme.styles.p;
    const fontSize = themeStyles.fontSize;

    slideElement.setAttribute("text-geometry", {
      value: element.content,
      font: "#optimerBoldFont",
      size: fontSize
    });

    slideElement.setAttribute("position", `0 ${this.y} 0`);

    this.el.appendChild(slideElement);

    this.y -= fontSize;
  }
});
