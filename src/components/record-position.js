AFRAME.registerComponent("record-position", {
  schema: {
    target: { type: "selector" }
  },

  tick(time, deltaTime) {
    const { position, rotation } = this.el.object3D;

    const target = this.data.target;

    target.object3D.position.set(position.x, position.y, position.z);

    target.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
  }
});
