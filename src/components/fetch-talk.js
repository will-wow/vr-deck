import { fetchTalk } from "../store/talk";
import { emit } from "../lib/action";
import { ACTIONS } from "../store/state";

AFRAME.registerComponent("fetch-talk", {
  init() {
    // TODO: use the path instead of params
    const params = getParams();
    const slug = params.get("talk") || "test-deck";

    this.loadTalk(slug);
  },
  async loadTalk(slug) {
    const talk = await fetchTalk(slug);

    console.log("talk", talk.name);
    document.title = `VR Deck: ${talk.name}`;

    emit(ACTIONS.loadedTalk, talk);
  }
});

function getParams() {
  return new URL(document.location).searchParams;
}
