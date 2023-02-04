/**
 * Adds downloadHtmlTemplate command
 */
import {downloadHtmlTemplate} from "./consts";

const commands = (editor, config) => {
  const cm = editor.Commands;

  cm.add(downloadHtmlTemplate, e => {
    const pHtml = e.getModel().get('Parser').parserHtml;
    let html = pHtml.unquoteJsxExpresionsInAttributes(e.getHtml());
    config.onDownloadTemplate && config.onDownloadTemplate(html, e.getCss())
  })
}

export default commands;