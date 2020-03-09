import deck from "./data/deck";
const slideCount = deck.slides.length;

AFRAME.registerState({
  initialState: {
    slide: 0,
    head: {},
    right: {},
    left: {},
    highlightedLine: -1
  },

  handlers: {
    nextSlide: function(state, _action) {
      state.slide = (state.slide + 1) % slideCount;
    },
    prevSlide: function(state, _action) {
      const newState = state.slide - 1;
      if (newState < 0) {
        state.slide = slideCount - 1;
      } else {
        state.slide = newState;
      }
    },
    recordTick(state, { target, ...payload }) {
      state[target] = payload;
    },
    highlight(state, { line }) {
      state.highlightedLine = line;
    }
  }
});
