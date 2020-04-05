function requireAll(req) {
  req.keys().forEach(req);
}

// Require all components.
requireAll(require.context("./components/", true, /\.js$/));

import "aframe-text-geometry-component";
import "aframe-state-component";
import "aframe-layout-component";

import "./store/state.js";
import "./scene.html";
