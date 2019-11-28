import { getCommentOnlyContainMMSS } from '@/utils';
import { IoriginCommentItem, IfilteredCommentItem } from '@/types/api';
describe('11', () => {
  it('22', () => {
    const keke: IoriginCommentItem = {
      snippet: {
        topLevelComment: {
          snippet: {
            textDisplay: '',
            textOriginal: '0:00 ↵Me: I love this song',
            likeCount: 0,
          },
        },
      },
    };

    const keke2: IoriginCommentItem = {
      snippet: {
        topLevelComment: {
          snippet: {
            textDisplay: '',
            textOriginal: '0:18 시작↵↵0:34 xxㅋㅋ↵↵4:18 xx↵↵8:02 yy!↵↵8:55 ghh',
            likeCount: 0,
          },
        },
      },
    };
    // keke.snippet.topLevelComment.snippet.textOriginal = 'xx';

    const test = [keke, keke2, keke];
    const result = getCommentOnlyContainMMSS(test);
    console.log('result', result);
    expect(result.length).toBe(3);
  });
});
