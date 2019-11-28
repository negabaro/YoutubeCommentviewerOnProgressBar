import axios, { AxiosResponse } from 'axios';

const rootPath = `https://www.googleapis.com/youtube/v3`;
export const fetchGet = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${rootPath}/${path}`);
  const data = await res.json();
  return data;
};

export default {
  get(path: string, config = {}) {
    // console.log(`url: ${apiRootPath}/${path}`);
    return axios({
      method: 'GET',
      url: `${rootPath}/${path}`,
      ...config,
    })
      .then((res: AxiosResponse) => res.data)
      .catch(err => console.error('api request failed', err));
  },
};
