import { fetchTalk } from "../store/talk";

AFRAME.registerComponent("fetch-talk", {
  init() {
    const params = getParams();
    const slug = params.get("talk");

    fetchTalk(slug);
  }
});

function getParams() {
  return new URL(document.location).searchParams;
}
