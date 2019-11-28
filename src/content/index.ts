import store from '../store';
import { fetchVideoDuration, fetchYoutubeComment } from './reqBackGround';
import { getSlideBarWidthSize, addRootDiv, removeDivAll } from './ctrlDom';
import { getPerMilliSeconds, getCurrentVideoID } from '../utils';
import * as types from '../store/mutation-types';
import { IfilteredComment, IdurationDetail } from '../types/api';

setTimeout(function() {
  rootLogic();
}, 1000);

/* ========================================================= */
let href = location.href;
const observer = new MutationObserver(function(mutations) {
  if (href !== location.href) {
    href = location.href;
    removeDivAll();
    rootLogic();
  }
});
observer.observe(document, { childList: true, subtree: true });

/* ========================================================= */

const rootLogic = async () => {
  store.commit(types.UPDATE_CURRENT_VIDEO_ID, getCurrentVideoID());
  const videoId = store.getters.currentVideoId;
  const durationOrigin: any = await fetchVideoDuration<IdurationDetail>(videoId);

  store.commit(types.UPDATE_SLIDEBAR_WIDTH_SIZE, getSlideBarWidthSize());
  const slideBarWidthSize = store.getters.slideBarWidthSize;

  await getComment(
    store.getters.currentVideoId,
    getPerMilliSeconds(durationOrigin.result, slideBarWidthSize),
    store.getters.currentNextPageToken
  );
};

const getComment = async (videoId: string, perMilliSeconds: number, nextPageToken: string) => {
  const items = await fetchYoutubeComment<IfilteredComment>(videoId, nextPageToken);

  // store.commit(types.UPDATE_FILTERED_ALL_COMMENT_COUNT, items.result.length);
  store.commit(types.UPDATE_NEXT_PAGETOKEN, items.nextPageToken);

  addRootDiv(items.result, perMilliSeconds);
  jobDone(videoId, perMilliSeconds);
};

const jobDone = (videoId: string, pxPerMilliSeconds: number) => {
  const nextPageToken = store.getters.currentNextPageToken;
  if (nextPageToken) {
    getComment(videoId, pxPerMilliSeconds, nextPageToken);
  }
};
