/* eslint-disable no-return-await */
import store from '../store';
import { fetchAllCommentCountApi, fetchVideoDuration, fetchYoutubeApi } from './reqBackGround';
import { getSlideBarWidthSize, addRootDiv, removeDivAll } from './ctrlDom';
import { convertDuration, getPxPerMilliSeconds, getCurrentVideoID } from '../utils';
// import window from '../utils/window';
import * as types from '../store/mutation-types';
import { IfilteredComment, IdurationDetail } from '../types/api';
import { ResizeObserver } from 'resize-observer';

setTimeout(function() {
  runRootFetch();
}, 1000);
/* ========================================================= */

const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log('entry.target', entry.target);

    // 検知した変更の矩形
    const rect = entry.contentRect;
    console.log(rect.top, rect.left);
    console.log(rect.width, rect.height);
    store.commit(types.UPDATE_SLIDEBAR_WIDTH_SIZE, rect.width);
    const slideBarWidthSize = rect.width;
    // const pxPerMilliSeconds =  runGetPxPerMilliSeconds(duration, slideBarWidthSize);
    // trasnlateX 값얻어내서 변경된만큼 재설정해주는 수밖에??
  }
});
const target = document.getElementsByClassName('ytp-progress-list')[0];
// target の監視を開始する
resizeObserver.observe(target);
/* ========================================================= */
var href = location.href;
var observer = new MutationObserver(function(mutations) {
  if (href !== location.href) {
    console.log('Before:', href);
    console.log('After:', location.href);
    href = location.href;

    removeDivAll();
    runRootFetch();
    // ctm.addDivRoot(ctm.currentVideoID());
  }
});

observer.observe(document, { childList: true, subtree: true });

/* ========================================================= */

const runRootFetch = async () => {
  // let allCommentCount;
  let durationOrigin: any;
  const currentVideoID = getCurrentVideoID();
  // store.dispatch('setCurrentVideoId', currentVideoID);
  store.commit(types.UPDATE_CURRENT_VIDEO_ID, currentVideoID);
  const videoId = store.getters.currentVideoId;
  [durationOrigin] = await Promise.all([
    // fetchAllCommentCountApi(videoId),
    // this.fetchYoutubeApi(videoId),
    fetchVideoDuration<IdurationDetail>(videoId),
  ]);

  // const duration = convertDuration(durationOrigin.result);

  const firstSlideBarWidthSize = getSlideBarWidthSize();
  store.commit(types.UPDATE_SLIDEBAR_WIDTH_SIZE, firstSlideBarWidthSize);

  const slideBarWidthSize = store.getters.slideBarWidthSize;
  await runSecondeFetch({ slideBarWidthSize, durationOrigin: durationOrigin.result });

  // const pxPerMilliSeconds = runGetPxPerMilliSeconds(durationOrigin.result, store.getters.slideBarWidthSize);

  // const nextPageToken = store.getters.currentNextPageToken;
  // await runYoutubeApi(videoId, pxPerMilliSeconds, nextPageToken);
};

const runSecondeFetch = async ({ durationOrigin, slideBarWidthSize }: any) => {
  const pxPerMilliSeconds = runGetPxPerMilliSeconds(durationOrigin, slideBarWidthSize);
  const nextPageToken = store.getters.currentNextPageToken;
  const videoId = store.getters.currentVideoId;
  await runYoutubeApi(videoId, pxPerMilliSeconds, nextPageToken);
};

const runGetPxPerMilliSeconds = (durationOrigin: any, slideBarWidthSize: number) => {
  const duration = convertDuration(durationOrigin);
  const pxPerMilliSeconds = getPxPerMilliSeconds(duration, slideBarWidthSize);
  return pxPerMilliSeconds;
};

const runYoutubeApi = async (videoId: string, pxPerMilliSeconds: number, nextPageToken: string) => {
  const items = await fetchYoutubeApi<IfilteredComment>(videoId, nextPageToken);

  store.commit(types.UPDATE_FILTERED_ALL_COMMENT_COUNT, items.result.length);
  // store.dispatch('setCurrentNextPageToken', items.nextPageToken);
  store.commit(types.UPDATE_NEXT_PAGETOKEN, items.nextPageToken);

  addRootDiv(items.result, pxPerMilliSeconds);
  jobDone(videoId, pxPerMilliSeconds);
};

const jobDone = (videoId: string, pxPerMilliSeconds: number) => {
  const nextPageToken = store.getters.currentNextPageToken;
  // console.info('jobDone', nextPageToken);
  if (nextPageToken) {
    runYoutubeApi(videoId, pxPerMilliSeconds, nextPageToken);
  }
};
