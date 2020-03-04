AFRAME.registerState({
  initialState: {
    slide: 0
  },

  handlers: {
    nextSlide: function(state, _action) {
      state.slide += 1;
    },

    lastSlide: function(state, _action) {
      state.slide -= 1;
    }
  }
});
