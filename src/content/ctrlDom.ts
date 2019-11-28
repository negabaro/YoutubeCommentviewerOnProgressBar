import { getPx } from '../utils';
const ROOT_COMMENT_CLASS_NAME = 'ytp-progress-bar';
const CUSTOM_COMMENT_CLASS_NAME = 'ytp-tooltip-text-wrapper-custom';
const CUSTOM_SCRUBBER_CLASS_NAME = 'ytp-scrubber-container-custom';
const EVENT_TARGET_CLASS_NAME = 'ytp-tooltip';

const removeDIv = (dom: any) => {
  if (dom.length !== 0) {
    dom.remove();
  }
};

export const removeDivAll = () => {
  removeDIv($(`.${CUSTOM_COMMENT_CLASS_NAME}`)); // 기존 커맨트
  removeDIv($(`.${CUSTOM_SCRUBBER_CLASS_NAME}`)); // 기존 scrubber
};

export const addRootDiv = (items: any, pxPerMilliSeconds: number) => {
  const rootTargetDiv = $(`.${ROOT_COMMENT_CLASS_NAME}`);

  items.forEach((item: any) => {
    const resultPx = getPx(pxPerMilliSeconds, item.time[1], item.time[2]);
    const scurubberDiv = setEventScrubberDiv(item.time[0], item.origin, resultPx);
    if (rootTargetDiv.length) {
      rootTargetDiv.append(scurubberDiv);
    }
  });
};

const setEventScrubberDiv = (time: string, origin: string, resultPx: number) => {
  const scrubberDiv = getScrubbeDom(time, resultPx);

  scrubberDiv.bind('mouseover', function(event) {
    if (scrubberDiv.attr('value') === time) {
      const commentTargetDiv = $(`.${EVENT_TARGET_CLASS_NAME}`);
      console.log('commentTargetDiv!!', commentTargetDiv);
      if (commentTargetDiv.length) {
        console.log('origin', origin);
        const commentDiv = getCustomCommentDom(origin, time);
        commentTargetDiv.append(commentDiv);
      }
    }
  });

  scrubberDiv.bind('mouseout', function(evnet) {
    const allCommentDom = $(`.${CUSTOM_COMMENT_CLASS_NAME}`);
    allCommentDom.remove();
  });

  return scrubberDiv;
};

const getCustomCommentDom = (origin: string, time: string) =>
  $(
    `<div class="${CUSTOM_COMMENT_CLASS_NAME}" value=${time} style="position: absolute; bottom: 100px;background-color: rgba(28,28,28,0.9)">${origin}</div>`
  );

const getScrubbeDom = (time: string, resultPx: number) =>
  $(`
  <div class="ytp-scrubber-container ${CUSTOM_SCRUBBER_CLASS_NAME}" value=${time} style="transform: translateX(${resultPx}px);">
    <div class="ytp-scrubber-button ytp-swatch-background-color" style="background-color: #f87c7c; height: 13px;">
      <div class="ytp-scrubber-pull-indicator">
      </div>
    </div>
  </div>
  `);
export const getSlideBarWidthSize = () => document.getElementsByClassName('ytp-progress-list')[0].clientWidth;
