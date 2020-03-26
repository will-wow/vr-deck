import api from "../lib/api";
import { emit } from "../lib/action";
import { ACTIONS } from "../store/state";

let talk = {};
let motionCapture = [];

export async function fetchTalk(slug) {
  const response = await api.get(`/talks/${slug}`);
  talk = response.data.data;

  emit(ACTIONS.loadedTalk, talk);

  fetchMotionCapture(talk);

  return talk;
}

export function getTalk() {
  return talk;
}

export function getMotionCapture() {
  return motionCapture;
}

async function fetchMotionCapture(talk) {
  const response = await api.get(talk.motion_capture);
  motionCapture = response.data;
  console.log(motionCapture);
}
