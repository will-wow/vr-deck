import { fetchTalk } from "../store/talk";

AFRAME.registerComponent("fetch-talk", {
  init() {
    // TODO: use the path instead of params
    const params = getParams();
    const slug = params.get("talk") || "test-deck";

    fetchTalk(slug);
  }
});

function getParams() {
  return new URL(document.location).searchParams;
}
