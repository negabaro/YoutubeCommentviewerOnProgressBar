import { getCommentOnlyContainMMSS } from '../utils/index';
import { IoriginComment, IdurationDetail, IcommentCountDetail } from '@/types/api';
import { fetchGet } from '../repository/Repository';

const youtubeApiKey = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';
const getAllCommentCountApiPath = (youtubeApiKey: string, videoId: string) => {
  return `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${youtubeApiKey}`;
};
const getContentDetailsPath = (youtubeApiKey: string, videoId: string) => {
  return `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${youtubeApiKey}`;
};

const getPlayTimeApi = async <T>(videoId: string): Promise<T> => {
  const url = getContentDetailsPath(youtubeApiKey, videoId);
  const res = await fetchGet<T>(url);
  return res;

  // const res = await fetch(getContentDetailsPath(youtubeApiKey, videoId));
  // const data: items<durationDetail> = await res.json();
  // return data;
};

const getAllCommentCountApi2 = async <T>(videoId: string): Promise<T> => {
  // const res = await fetch(getAllCommentCountApiPath(youtubeApiKey, videoId));
  const url = getAllCommentCountApiPath(youtubeApiKey, videoId);
  const res = await fetchGet<T>(url);
  // const data: items<commentCountDetail> = await res.json();
  return res;
};

const getCommentApi = async <T>(videoId: string, nextPageToken: string): Promise<T> => {
  let url;
  if (nextPageToken) {
    url = getCommentApiPath(youtubeApiKey, videoId, nextPageToken);
  } else {
    url = getCommentApiPath(youtubeApiKey, videoId, null);
  }
  const res = await fetchGet<T>(url);
  return res;
  // const res = await fetchCustom(url, 10);

  // const res = await fetch(url);
  // console.log('res', res);
  // const data: IoriginComment = await res.json();
  // console.log('data2', data);
  // return data;

  // return res;
  // return data.items;
  // ↓無理やり一行で書くとこうなる
  // return await (await fetch(URL)).json();
};

const getCommentApiPath = (youtubeApiKey: string | null, videoId: string, nextPageToken: string | null): string => {
  let result;
  if (nextPageToken) {
    result = `https://www.googleapis.com/youtube/v3/commentThreads?key=${youtubeApiKey}&textFormat=plainText&moderationStatus=published&order=relevance&part=snippet&videoId=${videoId}&maxResults=100&pageToken=${nextPageToken}`;
  } else {
    result = `https://www.googleapis.com/youtube/v3/commentThreads?key=${youtubeApiKey}&textFormat=plainText&moderationStatus=published&order=relevance&part=snippet&videoId=${videoId}&maxResults=100`;
  }
  console.log('result', result);
  return result;
};

/* =============================================================================== */
// TODO any
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse): any {
  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  if (request.contentScriptQuery === 'queryComment') {
    (async () => {
      const result = await getCommentApi<IoriginComment>(request.videoId, request.nextPageToken);
      const filterredResult = await getCommentOnlyContainMMSS(result.items);
      sendResponse({ result: filterredResult, nextPageToken: result.nextPageToken });
    })();

    return true; // Will respond asynchronously.
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  } else if (request.contentScriptQuery === 'queryDuration') {
    /* 
    store.dispatch('getVideoDurationApi', { videoId: request.videoId });
    const result = store.getters.videoDuration;
    */
    (async () => {
      const payload = await getPlayTimeApi<IdurationDetail>(request.videoId);
      const result = payload.items[0].contentDetails.duration;
      sendResponse({ result });
    })();

    return true; // Will respond asynchronously.
  } else if (request.contentScriptQuery === 'queryAllCommentCount') {
    (async () => {
      const payload = await getAllCommentCountApi2<IcommentCountDetail>(request.videoId);
      const result = payload.items[0].statistics.commentCount;
      sendResponse({ result });
    })();

    return true; // Will respond asynchronously.
  }
});
