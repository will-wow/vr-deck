import deck from "./data/deck";
const slideCount = deck.slides.length;

AFRAME.registerState({
  initialState: {
    slide: 0,
    head: {},
    right: {},
    left: {},
    highlightedLine: -1,
    mirror: true,
    audioRecording: null
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
    },
    toggleMirror(state, _value) {
      if (this.play) return;
      state.mirror = !state.mirror;
    },
    togglePlay(state, _value) {
      state.record = false;
      state.play = !state.play;
    },
    toggleRecord(state, _value) {
      state.play = false;
      state.record = !state.record;
    },
    audioRecorded(state, { url }) {
      state.audioRecording = `url(${url})`;
    }
  }
});
