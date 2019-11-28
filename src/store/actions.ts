import * as types from './mutation-types';
import { ActionTree } from 'vuex';
import Repository from '../repository/Repository';

/* 해당video의 전체커맨트수를 취득 */
export const getAllCommentCountApi: any = async ({ commit, getters }: any, { videoId }: any) => {
  console.log(`getAllCommentCountApi 4 ${Date.now()}`);
  const youtubeApiKey = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';
  const para = `videos?part=statistics&id=${videoId}&key=${youtubeApiKey}`;

  const res = await Repository.get(para);
  console.log(`getAllCommentCountApi 4.1 ${Date.now()}`, res);
  if (!res) {
    console.error('PageConfig, APIの返却値が不正です。');
  }

  commit(types.UPDATE_ALL_COMMENT_COUNT, res);
};

/* 해당video의 재생시간을 취득 */
export const getVideoDurationApi: any = async ({ commit, getters }: any, { videoId }: any) => {
  console.log('videoId', videoId);
  const youtubeApiKey = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';
  const para = `videos?id=${videoId}&part=contentDetails&key=${youtubeApiKey}`;

  const res = await Repository.get(para);

  if (!res) {
    console.error('PageConfig, APIの返却値が不正です。');
  }

  commit(types.UPDATE_VIDEO_DURATION, res);
  console.log('res:', res);
};

/* 해당 video의 comment를 취득 */
export const getCommentApi: any = async ({ commit, getters }: any, { videoId, nextPageToken }: any) => {
  const youtubeApiKey = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';
  const para = `commentThreads?key=${youtubeApiKey}&textFormat=plainText&moderationStatus=published&order=relevance&part=snippet&videoId=${videoId}&maxResults=100`;
  const para2 = `&pageToken=${nextPageToken}`;
  const para3 = `${para}&${para2}`;

  const res = await Repository.get(para3);

  if (!res) {
    console.error('PageConfig, APIの返却値が不正です。');
  }

  commit(types.UPDATE_COMMENT_ITEM, res);
};

/* nextPageToken 있는지  */
// export const getNextPageToken: any = async ({ commit, getters }: any, { videoId, nextPageToken }: any) => {
// }

export const reqBackgroundGetComment = async ({ commit, getters }: any, { videoId }: any) => {
  // commit(types.UPDATE_FOO, payload);
  console.warn('reqBackgroundGetComment xxxxxxxxxxxxxxxxx', videoId);
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'queryDuration',
      videoId: 'L_nqI5sEKkA',
    },
    function(response) {
      console.log(response);
      alert(response);
    }
  );
};

export const actions: ActionTree<any, any> = {
  getCommentApi,
  getVideoDurationApi,
  getAllCommentCountApi,
};
