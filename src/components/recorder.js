import { updatePosition } from "../lib/update-position";

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
      console.log("record", record);
      if (record) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    }

    if (oldData.play !== play) {
      console.log("play", play);
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
    this.el.removeEventListener("record", this.recordEvent);
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

    const firstFrame = this.recording[0];
    this.currentTime = firstFrame.timestamp;
  },

  tick(timestamp, delta) {
    if (!this.data.play) return;

    this.currentTime = this.currentTime + delta;

    let currentEvent = this.recording[this.currentEventIndex];

    while (currentEvent && this.currentTime >= currentEvent.timestamp) {
      updatePosition(
        currentEvent.target,
        currentEvent.position,
        currentEvent.rotation
      );

      this.currentEventIndex += 1;
      currentEvent = this.recording[this.currentEventIndex];
    }
  }
});
