const sendMessage = <T>(data: any): Promise<T> => {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage(data, res => {
      resolve(res as T);
    });
  });
};

export const fetchAllCommentCountApi = async <T>(videoId: string): Promise<T> => {
  const res = await sendMessage<T>({
    contentScriptQuery: 'queryAllCommentCount',
    videoId: videoId,
  });
  return res;
};

export const fetchVideoDuration = async <T>(videoId: string): Promise<T> => {
  const res = await sendMessage<T>({
    contentScriptQuery: 'queryDuration',
    videoId: videoId,
  });
  return res;
};

export const fetchYoutubeComment = async <T>(videoId: string, nextPageToken: string): Promise<T> => {
  const res = await sendMessage<T>({
    contentScriptQuery: 'queryComment',
    videoId: videoId,
    nextPageToken: nextPageToken,
  });
  return res;
};
