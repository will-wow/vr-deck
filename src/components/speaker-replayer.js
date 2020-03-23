import { updatePosition } from "../lib/update-position";
import { emit } from "../lib/action";

import recording from "../assets/data/sample-talk/motion-capture.json";

AFRAME.registerComponent("speaker-replayer", {
  schema: {
    play: { type: "boolean", default: false }
  },
  dependencies: ["speaker-recorder"],

  init() {
    this.recording = [];
    this.currentTime = 0;
    this.currentEventIndex = 0;
  },

  update(oldData) {
    const { play } = this.data;

    if (oldData.play !== play) {
      if (play) {
        this.startPlayback();
      }
    }
  },

  startPlayback() {
    this.currentEventIndex = 0;

    const localRecording = this.el.components["speaker-recorder"].recording;
    this.recording = localRecording.length > 0 ? localRecording : recording;

    const firstFrame = this.recording[0];
    this.currentTime = firstFrame.timestamp;
  },

  tick(timestamp, delta) {
    if (!this.data.play) return;

    this.currentTime = this.currentTime + delta;

    let currentEvent = this.recording[this.currentEventIndex];

    while (currentEvent && this.currentTime >= currentEvent.timestamp) {
      if (currentEvent.type) {
        this.handleActionEvent(currentEvent);
      } else {
        this.handlePositionEvent(currentEvent);
      }

      this.currentEventIndex += 1;
      currentEvent = this.recording[this.currentEventIndex];
    }
  },
  handlePositionEvent({ target, position, rotation }) {
    updatePosition(target, position, rotation);
  },
  handleActionEvent({ type, payload }) {
    emit(type, payload);
  }
});
