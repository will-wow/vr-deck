import { RECORDABLE_ACTIONS } from "../store/state";

AFRAME.registerComponent("speaker-recorder", {
  schema: {
    record: { type: "boolean", default: false }
  },
  init() {
    this.recording = [];

    /* Events */
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.recordEvent = this.recordEvent.bind(this);
    this.recordAction = this.recordAction.bind(this);

    this.el.addEventListener("record__start", this.startRecording);
    this.el.addEventListener("record__stop", this.stopRecording);
  },

  update(oldData) {
    const { record } = this.data;

    if (oldData.record !== record) {
      if (record) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    }
  },

  startRecording() {
    this.recording = [];
    this.el.addEventListener("record", this.recordEvent);

    RECORDABLE_ACTIONS.forEach(action => {
      this.el.addEventListener(action, this.recordAction);
    });
  },

  stopRecording() {
    this.el.removeEventListener("record", this.recordEvent);

    RECORDABLE_ACTIONS.forEach(action => {
      this.el.addEventListener(action, this.recordAction);
    });

    console.log(this.recording);

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

  recordAction(event) {
    const { type, detail } = event;
    this.recording.push({
      type,
      timestamp: this.el.time,
      payload: detail
    });
  }
});
