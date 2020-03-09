AFRAME.registerComponent("record-position", {
  schema: {
    target: { type: "selector" }
  },

  init() {
    this.scene = AFRAME.scenes[0];
  },

  tick(time, deltaTime) {
    if (!this.scene) return;
    const { position, rotation } = this.el.object3D;

    const target = this.data.target;

    target.object3D.position.set(position.x, position.y, position.z);

    target.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
  }
});
