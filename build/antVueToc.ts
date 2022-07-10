import { createBuilder, PipelineStage } from 'vite-plugin-md';
import { readFileSync } from 'fs';

interface TocAst {
  href: string;
  title: string;
  children: TocAst[];
}

/**
 * 从DOM解析Toc的Ast
 * 提供单个<OL> HTMLElement，<OL> -> 1-N个<LI> -> 1个<A>[+0-1个<OL>]
 * */
function parseToc(ol: HTMLElement): TocAst[] {
  const tocAsts: TocAst[] = [];
  Array.from(ol.children).forEach((li: HTMLElement) => {
    const a = li.firstElementChild;
    tocAsts.push({
      href: a.getAttribute('href'),
      title: a.innerHTML,
      children: a.nextElementSibling
        ? parseToc(a.nextElementSibling as HTMLElement)
        : [],
    });
  });
  return tocAsts;
}

export const antVueToc = createBuilder('antVueToc', PipelineStage.dom)
  .options<{ sfcPath: string }>()
  .initializer()
  .handler(async (p, o) => {
    //TODO:改为更友好的import
    const sfcStr = readFileSync(o.sfcPath).toString();

    //原始DOM根，含一个rawToc和若干个MD body elements
    const rawRoot = p.html.firstElementChild;

    //原始Toc根，是<NAV>元素
    const rawToc = rawRoot.getElementsByClassName('table-of-contents')[0];

    //仅剩MD body elements
    rawRoot.removeChild(rawToc);

    //  将原始Toc解析为Ast
    const tocAsts = parseToc(rawToc.firstElementChild);

    // 从document上移除，后续注入sfc
    rawRoot.parentNode.removeChild(rawRoot);

    const sfc = p.html.ownerDocument.createElement('div');
    sfc.innerHTML = sfcStr
      //先注入rawRoot到<template>
      .replace('<md-body-placeholder />', rawRoot.toString())
      //再注入tocAsts到ts
      .replace(
        /\[\s*(\/\* tocAstPlaceHolder \*\/)\s*]/g,
        JSON.stringify(tocAsts)
      );

    //sfc的dom构建完毕，注入回document
    Array.from(sfc.children).forEach((ele) => {
      p.html.append(ele);
    });

    return p;
  })
  .meta({
    description: 'use with MDI-toc-done-right to generate ant vue design toc',
  });
