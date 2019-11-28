import { getPx } from '../utils';
export const removeDIv = (dom: any) => {
  if (dom.length !== 0) {
    dom.remove();
    console.warn('removeDiv', dom);
  }
};

export const removeDivAll = () => {
  removeDIv($('.negabaro'));
  removeDIv($('.ytp-scrubber-container22')); // 기존 scrubber
  removeDIv($('.ytp-tooltip-text-wrapper22')); // 기존 커맨트
};

export const addRootDiv = (items: any, pxPerMilliSeconds: number) => {
  // targetDiv
  const rootTargetDiv = $('.ytp-progress-bar');
  // const commentTargetDiv = $('.ytp-tooltip'); //display: none
  // const commentTargetDiv = $('.ytp-tooltip[style*="display: none"]');
  // console.log('commentTargetDiv', commentTargetDiv);
  items.forEach((item: any) => {
    addDebugDiv(item);
    const resultPx = getPx(pxPerMilliSeconds, item.time[1], item.time[2]);
    const scurubberDiv = addScrubberDiv(item.time[0], item.origin, resultPx);
    if (rootTargetDiv.length) {
      const resultDiv = rootTargetDiv.append(scurubberDiv);
      console.info('resultDiv: ', resultDiv);
    }
  });
};

export const addCommentDiv = (origin: string, time: string) => {
  // TODO any
  /*
  const commentDiv: any = document.createElement('div');
  commentDiv.className = 'ytp-tooltip-text-wrapper22';
  commentDiv.value = time;
  commentDiv.style = 'position: absolute; bottom: 100px;background-color: rgba(28,28,28,0.9); display: none';
  commentDiv.innerHTML = origin;
  */
  const commentDiv = $(
    `<div class="ytp-tooltip-text-wrapper22" value=${time} style="position: absolute; bottom: 100px;background-color: rgba(28,28,28,0.9)">${origin}</div>`
  );

  // commentTargetDiv.appendChild(commentDiv);
  return commentDiv;
};

export const addDebugDiv = (item: any) => {
  const debugDiv = '';
  return debugDiv;
};

export const getSlideBarWidthSize = () => {
  // const v = $(".ytp-progress-list");

  // var v: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('ytp-progress-list')[0];
  const v = document.getElementsByClassName('ytp-progress-list')[0];
  return v.clientWidth;
};

export const addScrubberDiv = (time: string, origin: string, resultPx: number) => {
  console.log('resultPx', resultPx);
  // TODO HTMLDivElementだとvalue,styleが存在しないみたい..
  /* const scrubberDiv: any = document.createElement('div');
  scrubberDiv.className = 'ytp-scrubber-container ytp-scrubber-container22';
  scrubberDiv.value = time;
  scrubberDiv.style = `transform: translateX(${resultPx}px);`;

  const addDiv: any = document.createElement('div');
  addDiv.className = 'ytp-scrubber-button ytp-swatch-background-color';
  addDiv.style = 'background-color: #f87c7c; height: 13px;';

  const addDiv2: any = document.createElement('div');
  addDiv2.className = 'ytp-scrubber-pull-indicator';

  addDiv.appendChild(addDiv2);
  scrubberDiv.appendChild(addDiv);
  */
  const scrubberDiv = $(`
 <div class="ytp-scrubber-container ytp-scrubber-container22" value=${time} style="transform: translateX(${resultPx}px);">
   <div class="ytp-scrubber-button ytp-swatch-background-color" style="background-color: #f87c7c; height: 13px;">
     <div class="ytp-scrubber-pull-indicator">
     </div>
   </div>
 </div>
 `);
  /*
  scrubberDiv.innerHTML(`<div class="ytp-scrubber-button ytp-swatch-background-color" style="background-color: #f87c7c; height: 13px;">
  <div class="ytp-scrubber-pull-indicator">
  </div>
</div>`); */

  scrubberDiv.bind('mouseover', function(event) {
    // scrubberDiv.addEventListener('mouseover', function() {
    if (scrubberDiv.attr('value') === time) {
      const commentTargetDiv = $('.ytp-tooltip'); // TODO: 처음에 마우스오버했을때만 해도됨
      console.log('一致したぜ', commentTargetDiv);

      if (commentTargetDiv.length) {
        const commentDiv = addCommentDiv(origin, time);
        console.log('commentDiv', commentDiv);
        const re = commentTargetDiv.append(commentDiv);
        console.log('re', re);
        // commentDiv.show(); //COMMENT: display: none상태가 아니므로 불필요
      } else {
        console.warn('commentTargetDivが見つかりませんでした', commentTargetDiv);
      }
    }
  });

  scrubberDiv.bind('mouseout', function(evnet) {
    const allCommentDom = $('.ytp-tooltip-text-wrapper22');
    // allCommentDom.hide();
    allCommentDom.remove();
  });

  return scrubberDiv;
};

export const getDOM = (name: any) => {
  console.log('name', name);

  // const result = document.querySelector(`${name}[style*="display:none"]`);
  const result = Array.from(document.querySelectorAll(`${name}`)).filter(
    val => (val as any).style.display === 'none'
  )[0];

  console.log('document.querySelectorAll(name)', result);
  return result;
  // return targetDiv;
  /*
  if (targetDiv) {
    console.log('targetDivはありますよ');
  } else {
    console.error('targetDivはありませんよ？');
  } */
};

export const getDOM2 = (name: any) => {
  console.log('name', name);

  // const result = document.querySelector(`${name}[style*="display:none"]`);
  const result = Array.from(document.querySelectorAll(`${name}`))[0];

  console.log('document.querySelectorAll(name)2', result);
  return result;
  // return targetDiv;
  /*
  if (targetDiv) {
    console.log('targetDivはありますよ');
  } else {
    console.error('targetDivはありませんよ？');
  } */
};

/*
const _attr = function(node: any, name: string, value?: string) {
  if (typeof value === 'undefined') {
    return node.getAttribute(name);
  }
  node.setAttribute(name, value);
};
*/

export const updateTransformValue = () => {};
