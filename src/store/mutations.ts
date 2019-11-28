import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state: any, payload: any) {
    state.foo = payload;
  },
  [types.UPDATE_CURRENT_VIDEO_ID](state: any, payload: any) {
    console.log('mutation UPDATE_CURRENT_VIDEO_ID', payload);
    state.currentVideoId = payload;
  },
  [types.UPDATE_VIDEO_DURATION](state: any, payload: any) {
    console.error('payload:', payload.items[0].contentDetails.duration);
    state.videoDuration = payload.items[0].contentDetails.duration;
  },
  [types.UPDATE_NEXT_PAGETOKEN](state: any, payload: any) {
    if (payload) {
      state.currentNextPageToken = payload;
    } else {
      state.currentNextPageToken = null;
    }
  },
  [types.UPDATE_ALL_COMMENT_COUNT](state: any, payload: any) {
    console.log(`UPDATE_ALL_COMMENT_COUNT4.2 ${Date.now()}`, payload);
    console.log(`UPDATE_ALL_COMMENT_COUNT4.3 ${Date.now()}`, payload.items[0].statistics.commentCount);
    state.allCommentCount = payload.items[0].statistics.commentCount;
  },
  [types.UPDATE_FILTERED_ALL_COMMENT_COUNT](state: any, count: number) {
    state.allFilteredCommentCount += count;
    console.log('state.allFilteredCommentCount:', state.allFilteredCommentCount);
  },
  [types.UPDATE_COMMENT_ITEM](state: any, payload: any) {
    state.commentItem = payload;
  },
  // xx
  [types.UPDATE_SLIDEBAR_WIDTH_SIZE](state: any, size: number) {
    state.slideBarWidthSize = size;
  },
};
