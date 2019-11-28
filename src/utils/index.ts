import { IoriginCommentItem, IfilteredCommentItem } from '../types/api';

const convertDuration = (durationOrigin: string) => {
  const resultMatched = durationOrigin.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  let resultFiltered: string[] | undefined;
  if (resultMatched) {
    resultFiltered = resultMatched.slice(1).map(function(x) {
      if (x != null) {
        return x.replace(/\D/, '');
      }
      return '';
    });
  }

  if (resultFiltered) {
    const hours = parseInt(resultFiltered[0]) || 0;
    const minutes = parseInt(resultFiltered[1]) || 0;
    const seconds = parseInt(resultFiltered[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  } else {
    return 0;
  }
};

export const getPerMilliSeconds = (durationOrigin: any, slideBarWidthSize: number) => {
  const duration = convertDuration(durationOrigin);
  return slideBarWidthSize / (duration * 1000);
};

export const convertperMilliSecondsToPixel = (pxPerMilliSeconds: number, hours: number, minute: number) => {
  return pxPerMilliSeconds * ((hours * 60 + +minute) * 1000);
};

export const didVideoIDChange = (currentVideoId: string) => {
  return currentVideoId !== window.location.search;
};

export const getCurrentVideoID = () => {
  const k = window.location.search;
  // var regex = /\?v=*/;
  // var regex = /(\?v=*)/i;

  // sArG8qHfXQI
  // var result = k.match(regex);
  // var result = regex.exec(k);
  var result = k.replace('?v=', '');
  if (result) {
    return result;
  } else {
    return '...TT';
  }
};

export const getCommentOnlyContainMMSS = (arr: IoriginCommentItem[]) => {
  // console.log(filteredCommentItem);
  // console.log(commentItem);
  // TODO: 時間に該当する部分とコメントの内容を分けておく
  // https://qiita.com/chihiro/items/1047e40514a778c08baa
  const result = arr.reduce(function(
    accumulator: IfilteredCommentItem[],
    currentValue: IoriginCommentItem,
    currentIndex: number,
    array: []
  ) {
    console.log('currentValue', currentValue);
    console.log('currentIndex', currentIndex);
    const str = currentValue.snippet.topLevelComment.snippet.textOriginal;
    const regex = RegExp('^([0-6]?[0-9]):([0-6]?[0-9])');
    console.log('regex', regex);
    const ac: IfilteredCommentItem = {
      // key: 0,
      origin: '',
      time: null,
    };
    const arr = [];
    if (regex.test(str)) {
      console.log('match accumulator', accumulator);
      // ac.key = currentIndex;
      // 커맨트에 개행있으면..
      ac.origin = str;
      ac.time = str.match(regex);
      arr.push(ac);
      accumulator.push(ac);
    } else {
      console.log('no match accumulator', accumulator);
      // return currentValue;
    }
    // return arr;
    return accumulator;
  },
  []);
  return result;
};
