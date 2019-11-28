import * as types from './mutation-types';

export default {
  [types.UPDATE_CURRENT_VIDEO_ID](state: any, payload: any) {
    state.currentVideoId = payload;
  },
  // [types.UPDATE_VIDEO_DURATION](state: any, payload: any) {
  //  state.videoDuration = payload.items[0].contentDetails.duration;
  // },
  [types.UPDATE_NEXT_PAGETOKEN](state: any, payload: any) {
    if (payload) {
      state.currentNextPageToken = payload;
    } else {
      state.currentNextPageToken = null;
    }
  },
  // [types.UPDATE_ALL_COMMENT_COUNT](state: any, payload: any) {
  //  state.allCommentCount = payload.items[0].statistics.commentCount;
  // },
  // [types.UPDATE_FILTERED_ALL_COMMENT_COUNT](state: any, count: number) {
  //  state.allFilteredCommentCount += count;
  // },
  [types.UPDATE_SLIDEBAR_WIDTH_SIZE](state: any, size: number) {
    state.slideBarWidthSize = size;
  },
};
