import { fetchTalk } from "../store/talk";
import { emit } from "../lib/action";
import { ACTIONS } from "../store/state";

AFRAME.registerComponent("fetch-talk", {
  init() {
    const slug = getSlug();

    this.loadTalk = this.loadTalk.bind(this);

    this.loadTalk(slug);
    this.el.addEventListener(ACTIONS.loadTalk, () => this.loadTalk(slug));
  },
  async loadTalk(slug) {
    const talk = await fetchTalk(slug);

    document.title = `VR Deck: ${talk.name}`;

    emit(ACTIONS.loadedTalk, talk);
  }
});

function getSlug() {
  const url = new URL(document.location);
  return url.pathname.replace(/^\//, "");
}
