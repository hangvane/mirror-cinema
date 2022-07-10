import { createBuilder, PipelineStage } from 'vite-plugin-md';

function tagNameReplace(old: HTMLElement, tagName: string): HTMLElement {
  const new_ = old.ownerDocument.createElement(tagName);
  old.getAttributeNames().forEach((name) => {
    new_.setAttribute(name, old.getAttribute(name));
  });
  new_.innerHTML = old.innerHTML;
  old.parentNode.replaceChild(new_, old);
  return new_;
}

/**
 * TODO
 *
 * */
export const antVueMD = createBuilder('antVueMD', PipelineStage.dom)
  .options()
  .initializer()
  .handler(async (payload, o) => {
    const rawRoot = payload.html.firstElementChild;
    //p处理
    Array.from(rawRoot.getElementsByTagName('p')).forEach(
      (p: HTMLParagraphElement) => {
        tagNameReplace(p, 'a-typography-paragraph');
      }
    );

    // ul ol处理，注意这里不要处理到Toc
    //原始Toc根，是<NAV>元素
    const rawToc = rawRoot.getElementsByClassName('table-of-contents')[0];

    ['ul', 'ol'].forEach((tag) => {
      Array.from(rawRoot.getElementsByTagName(tag)).forEach(
        (ele: HTMLElement) => {
          if (rawToc.contains(ele)) return; //不处理Toc内部的列表
          const newEle = rawRoot.ownerDocument.createElement(
            'a-typography-paragraph'
          );
          ele.parentNode.replaceChild(newEle, ele);
          newEle.append(ele);
        }
      );
    });

    //table处理
    Array.from(rawRoot.getElementsByTagName('table')).forEach(
      (ele: HTMLElement) => {
        const div = rawRoot.ownerDocument.createElement('div');
        ele.parentNode.replaceChild(div, ele);
        div.append(ele);
        div.setAttribute('class', 'ant-table');
      }
    );
    Array.from(rawRoot.getElementsByTagName('thead')).forEach(
      (ele: HTMLElement) => {
        ele.setAttribute('class', 'ant-table-thead');
      }
    );
    Array.from(rawRoot.getElementsByTagName('tbody')).forEach(
      (ele: HTMLElement) => {
        ele.setAttribute('class', 'ant-table-tbody');
      }
    );
    Array.from(rawRoot.getElementsByTagName('tr')).forEach(
      (ele: HTMLElement) => {
        ele.setAttribute('class', 'ant-table-row');
      }
    );
    ['th', 'td'].forEach((tag) => {
      Array.from(rawRoot.getElementsByTagName(tag)).forEach(
        (ele: HTMLElement) => {
          ele.setAttribute('class', 'ant-table-cell');
        }
      );
    });

    //引用处理
    Array.from(rawRoot.getElementsByTagName('blockquote')).forEach(
      (bq: HTMLQuoteElement) => {
        const newBq = rawRoot.ownerDocument.createElement(
          'a-typography-paragraph'
        );
        bq.parentNode.replaceChild(newBq, bq);
        newBq.append(bq);
      }
    );

    // h处理
    const tagLevelMap = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5 };
    Object.keys(tagLevelMap).forEach((tag) => {
      Array.from(rawRoot.getElementsByTagName(tag)).forEach(
        (ele: HTMLElement) => {
          tagNameReplace(ele, 'a-typography-title').setAttribute(
            ':level',
            tagLevelMap[tag]
          );
        }
      );
    });

    // img处理
    Array.from(rawRoot.getElementsByTagName('img')).forEach(
      (img: HTMLImageElement) => {
        img.setAttribute('style', 'max-width: 90%;');
      }
    );

    return payload;
  })
  .meta({
    description: 'use with MDI-toc-done-right to generate ant vue design toc',
  });
