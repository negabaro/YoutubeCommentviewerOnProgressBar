import axios, { AxiosResponse } from 'axios';

/*
export default axios.create( {
  //baseURL: process.env.NUXT_ENV_API_HOST
  baseURL: 'localhost:6006'
} ) */

const apiRoot = `https://www.googleapis.com/youtube/v3`;

const axiosGet = '';
export const fetchGet = async <T>(apiPath: string): Promise<T> => {
  const res = await fetch(apiPath);
  const data = await res.json();
  return data;
};

export default {
  get(path: string, config = {}) {
    console.log(`url: ${apiRoot}/${path}`);
    return axios({
      method: 'GET',
      url: `${apiRoot}/${path}`,
      ...config,
    })
      .then((res: AxiosResponse) => res.data)
      .catch(err => console.error('APIリクエストに失敗しました。!', err));
  },
};
