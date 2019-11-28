import Repository from '../repository/Repository';
const youtubeApiKey = 'AIzaSyBo2-wFHQ-SFsOwby8P4B5_2xBqGic69lw';

export const getVideoDurationApi = async (videoId: string) => {
  /* 
  const res = await fetch(getContentDetailsPath(youtubeApiKey, videoId));
  const data = await res.json();
  return data;
  */
  const para = `videos?id=${videoId}&part=contentDetails&key=${youtubeApiKey}`;

  const res = await Repository.get(para);

  if (!res) {
    console.error('PageConfig, APIの返却値が不正です。');
  }
  return res;
};

export const getAllCommentCountApi = async (videoId: string) => {
  /*
  const res = await fetch(getAllCommentCountApiPath(youtubeApiKey, videoId));
  const data = await res.json();
  return data;
  */
  const para = `videos?part=statistics&id=${videoId}&key=${youtubeApiKey}`;

  const res = await Repository.get(para);

  if (!res) {
    console.error('PageConfig, APIの返却値が不正です。');
  }

  return res;
};
