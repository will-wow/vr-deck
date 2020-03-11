import { updatePosition } from "../lib/update-position";
import { downloadJson } from "../lib/download-file";
import recording from "../assets/data/sample-talk/motion-capture.json";

AFRAME.registerComponent("recorder", {
  schema: {
    play: { type: "boolean", default: false },
    record: { type: "boolean", default: false }
  },
  init() {
    this.recording = [];
    this.currentTime = 0;
    this.currentEventIndex = 0;

    /* Events */
    this.recordingEventListener;

    this.recordEvent = this.recordEvent.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

    this.el.addEventListener("record__start", this.startRecording);
    this.el.addEventListener("record__stop", this.stopRecording);
  },

  update(oldData) {
    const { play, record } = this.data;

    if (oldData.record !== record) {
      if (record) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    }

    if (oldData.play !== play) {
      if (play) {
        this.startPlayback();
      }
    }
  },

  startRecording() {
    this.recording = [];
    this.el.addEventListener("record", this.recordEvent);
  },

  stopRecording() {
    if (!this.play) return;

    this.el.removeEventListener("record", this.recordEvent);
    // downloadJson(this.recording, "motion-capture.json");
  },

  recordEvent(event) {
    const { position, rotation, timestamp, target } = event.detail;

    this.recording.push({
      target,
      timestamp,
      position: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z
      }
    });
  },

  startPlayback() {
    this.currentEventIndex = 0;

    // const firstFrame = this.recording[0];
    const firstFrame = recording[0];
    this.currentTime = firstFrame.timestamp;
  },

  tick(timestamp, delta) {
    if (!this.data.play) return;

    this.currentTime = this.currentTime + delta;

    let currentEvent = recording[this.currentEventIndex];
    // let currentEvent = this.recording[this.currentEventIndex];

    while (currentEvent && this.currentTime >= currentEvent.timestamp) {
      updatePosition(
        currentEvent.target,
        currentEvent.position,
        currentEvent.rotation
      );

      this.currentEventIndex += 1;
      // currentEvent = this.recording[this.currentEventIndex];
      currentEvent = recording[this.currentEventIndex];
    }
  }
});
