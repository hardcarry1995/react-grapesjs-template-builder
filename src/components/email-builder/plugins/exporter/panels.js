/**
 * Adds (download) button to options panel to call downloadHtmlTemplate command
 */
import {downloadHtmlTemplate} from "./consts";

const Panel = (editor, config) => {
    const pn = editor.Panels;

    // const eConfig = editor.getConfig();
    // const commandPanel = pn.getPanel('commands');

    pn.addButton('options', {
        id: downloadHtmlTemplate,
        className: 'fa fa-download',
        command: e => e.runCommand(downloadHtmlTemplate),
    })
}

export default Panel