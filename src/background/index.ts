import { getCommentOnlyContainMMSS } from '../utils/index';
import { IoriginComment, IdurationDetail, IcommentCountDetail } from '@/types/api';
import { fetchGet } from '../repository/Repository';
const YOUTUBE_API_KEY = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';
const getAllCommentCountApiPath = (videoId: string) => `videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

const getContentDetailsPath = (videoId: string) => `videos?id=${videoId}&part=contentDetails&key=${YOUTUBE_API_KEY}`;

const getCommentApiPath = (videoId: string, nextPageToken: string | null): string => {
  const commonPath = `commentThreads?key=${YOUTUBE_API_KEY}&textFormat=plainText&moderationStatus=published&order=relevance&part=snippet&videoId=${videoId}&maxResults=100`;
  if (nextPageToken) {
    return `${commonPath}&pageToken=${nextPageToken}`;
  }
  return commonPath;
};

const fetchDuration = async <T>(videoId: string): Promise<T> => {
  const url = getContentDetailsPath(videoId);
  const res = await fetchGet<T>(url);
  return res;
};

const fetchAllCommentCount = async <T>(videoId: string): Promise<T> => {
  // const res = await fetch(getAllCommentCountApiPath(youtubeApiKey, videoId));
  const url = getAllCommentCountApiPath(videoId);
  const res = await fetchGet<T>(url);
  // const data: items<commentCountDetail> = await res.json();
  return res;
};

const fetchGetComment = async <T>(videoId: string, nextPageToken: string): Promise<T> => {
  let url;
  if (nextPageToken) {
    url = getCommentApiPath(videoId, nextPageToken);
  } else {
    url = getCommentApiPath(videoId, null);
  }
  const res = await fetchGet<T>(url);
  return res;
};

/* =============================================================================== */
// TODO any
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse): any {
  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  if (request.contentScriptQuery === 'queryComment') {
    (async () => {
      const result = await fetchGetComment<IoriginComment>(request.videoId, request.nextPageToken);
      const filterredResult = await getCommentOnlyContainMMSS(result.items);
      sendResponse({ result: filterredResult, nextPageToken: result.nextPageToken });
    })();

    return true; // Will respond asynchronously.
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  } else if (request.contentScriptQuery === 'queryDuration') {
    (async () => {
      const payload = await fetchDuration<IdurationDetail>(request.videoId);
      const result = payload.items[0].contentDetails.duration;
      sendResponse({ result });
    })();

    return true; // Will respond asynchronously.
  } else if (request.contentScriptQuery === 'queryAllCommentCount') {
    (async () => {
      const payload = await fetchAllCommentCount<IcommentCountDetail>(request.videoId);
      const result = payload.items[0].statistics.commentCount;
      sendResponse({ result });
    })();

    return true; // Will respond asynchronously.
  }
});
