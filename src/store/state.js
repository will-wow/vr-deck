export const ACTIONS = {
  loadedTalk: "loadedTalk",
  nextSlide: "nextSlide",
  prevSlide: "prevSlide",
  highlight: "highlight",
  toggleMirror: "toggleMirror",
  togglePlay: "togglePlay",
  toggleRecord: "toggleRecord",
  audioRecorded: "audioRecorded"
};

export const RECORDABLE_ACTIONS = [
  ACTIONS.nextSlide,
  ACTIONS.prevSlide,
  ACTIONS.highlight
];

AFRAME.registerState({
  initialState: {
    play: false,
    record: false,
    mirror: true,
    talkLoaded: false,
    slide: -1,
    slideCount: 0,
    highlightedLine: -1,
    audioUrl: null,
    motionCaptureUrl: null
  },

  handlers: {
    [ACTIONS.loadedTalk](state, payload) {
      state.audioUrl = `url(${payload.audio})`;
      state.slideCount = payload.deck.slides.length;
      state.slide = 0;
      state.talkLoaded = true;
    },
    [ACTIONS.nextSlide](state, _payload) {
      state.slide = (state.slide + 1) % state.slideCount;
      state.highlightedLine = -1;
    },
    [ACTIONS.prevSlide](state, _payload) {
      const newState = state.slide - 1;
      if (newState < 0) {
        state.slide = state.slideCount - 1;
      } else {
        state.slide = newState;
      }
    },
    [ACTIONS.highlight](state, { line }) {
      state.highlightedLine = line;
    },
    [ACTIONS.toggleMirror](state, _payload) {
      if (state.play) return;
      state.mirror = !state.mirror;
    },
    [ACTIONS.togglePlay](state, _payload) {
      state.play = !state.play;

      if (state.play) {
        state.record = false;
        state.mirror = false;
      }
    },
    [ACTIONS.toggleRecord](state, _payload) {
      state.record = !state.record;

      if (state.record) {
        state.play = false;
        state.mirror = true;
      }
    },
    [ACTIONS.audioRecorded](state, { url }) {
      state.audioUrl = `url(${url})`;
    }
  }
});
