export function updatePosition(target, position, rotation) {
  target.object3D.position.set(position.x, position.y, position.z);
  target.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
}
