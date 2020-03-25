AFRAME.registerComponent("deck-unloader", {
  dependencies: ["speaker-recorder", "voice-recorder"]
  /*
    TODO:
    - listen for update event
    - put "recorded" state in store to toggle button enabled, 
    - get recordings from other components
    - convert motion capture to a file
    - Upload with multi-part from data https://github.com/axios/axios/pull/2805/files
    - put uploading state in store
    - show spinner or something
  */
});
