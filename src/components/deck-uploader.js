import FormData from "form-data";
import api from "../lib/api";

AFRAME.registerComponent("deck-uploader", {
  dependencies: ["speaker-recorder", "voice-recorder"],

  init() {
    this.upload = this.upload.bind(this);
    this.el.addEventListener("upload__start", this.start);
  },

  async upload() {
    const motionCapture = this.el.components["speaker-recorder"].recording;
    const motionCaptureFile = dataToFile(motionCapture);

    const audioFile = this.el.components["voice-recorder"].recording;
  }

  /*
    TODO:
    - put "recorded" state in store to toggle button enabled, 
    - Upload with multi-part from data https://github.com/axios/axios/pull/2805/files
    - put uploading state in store
    - show spinner or something
  */
});

function updateData(slug, audioFile, motionCaptureFile) {
  const form = new FormData();
  form.append("audio", audioFile);
  form.append("motion_capture", motionCaptureFile);

  api.patch(`/talks/${slug}`, form, { headers: form.getHeaders() });
}

function dataToFile(data) {
  return new Blob([JSON.stringify(data)], {
    type: "application/json"
  });
}
