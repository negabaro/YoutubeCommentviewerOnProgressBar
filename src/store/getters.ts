import { getPxPerMilliSeconds } from '../utils';

export const foo = (state: any) => state.foo;
export const foo2 = (state: any) => state.foo;
export const videoDuration = (state: any) => state.videoDuration;
export const allCommentCount = (state: any) => state.allCommentCount;
export const commentItem = (state: any) => state.commentItem;
export const currentVideoId = (state: any) => state.currentVideoId;
export const currentNextPageToken = (state: any) => state.currentNextPageToken;
export const slideBarWidthSize = (state: any) => state.slideBarWidthSize;
export const oldSlideBarWidthSize = (state: any) => state.oldSlideBarWidthSize;
export const newSlideBarWidthSize = (state: any) => state.newSlideBarWidthSize;
export const duration = (state: any) => state.duration;
export const pxPerMilliSeconds = (state: any) => {
  // getpxPerMilliSeconds不要
  return state.newSlideBarWidthSize / (state.duration * 1000);
};

export const getBackPx = (state: any) => (resultPx: number) => {
  return resultPx / state.pxPerMilliSeconds;
};

export const getForwardPx = (state: any) => {
  return state.getBackPx * state.slideBarWidthSize;
};
