import { fetchTalk } from "../store/talk";
import { ACTIONS } from "../store/state";

import { emit } from "../lib/action";
import { imageId } from "../lib/image";

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
    this.preloadImages(talk);

    emit(ACTIONS.loadedTalk, talk);
  },

  preloadImages(talk) {
    const assetBucket = document.querySelector("a-assets");

    talk.images.forEach((image) => {
      const asset = document.createElement("img");
      asset.setAttribute("id", imageId(image.id));
      asset.setAttribute("crossorigin", true);
      asset.setAttribute("src", image.image);

      assetBucket.appendChild(asset);
    });
  },
});

function getSlug() {
  const url = new URL(document.location);
  return url.pathname.replace(/^\//, "");
}
