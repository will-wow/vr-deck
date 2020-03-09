import deck from "./data/deck";
const max = deck.slides.length - 1;

AFRAME.registerState({
  initialState: {
    slide: 1,
    head: {},
    right: {},
    left: {}
  },

  handlers: {
    nextSlide: function(state, _action) {
      state.slide = Math.min(state.slide + 1, max);
    },

    prevSlide: function(state, _action) {
      state.slide = Math.max(state.slide - 1, max);
    },
    recordTick(state, { target, ...payload }) {
      state[target] = payload;
    }
  }
});
