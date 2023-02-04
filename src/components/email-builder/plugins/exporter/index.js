/**
 * Exporter plugin.
 *
 * Exports HTML, CSS
 */

import grapesjs from 'grapesjs';
import loadCommands from './commands';
import loadPanels from './panels';
import parserHtmlCaseSensitive from './ParserHtmlCaseSensitive';

import {
    exporterPluginRef
} from './consts';

export default function addExporterPlugin(param) {

    const {onDownloadTemplate} = param || {}

    grapesjs.plugins.add(exporterPluginRef, (editor, opts = {}) => {
        let c = opts;

        let defaults = {
            // Default style
            defaultStyle: true,

            onDownloadTemplate: onDownloadTemplate
        };

        // Load defaults
        for (let name in defaults) {
            if (!(name in c))
                c[name] = defaults[name];
        }

        // Load commands
        loadCommands(editor, c);

        // Load panels
        loadPanels(editor, c);

        const em = editor.getModel();
        const emConf = em.get('Config');
        // This needs to be handset (in GrapesJS it comes from parser/config/config.js)
        emConf.textTags = ['br', 'b', 'i', 'u', 'a', 'ul', 'ol'];
        em.get('Parser').parserHtml = parserHtmlCaseSensitive(emConf);
        //em.get('Parser').parserHtml = parserHtmlOrig(emConf);
        em.get('Parser').parseHtml = (str) => {
            const pHtml = em.get('Parser').parserHtml;
            //pHtml.compTypes = em ? em.get('DomComponents').getTypes() : compTypes;
            pHtml.compTypes = em.get('DomComponents').getTypes();
            let res = pHtml.parse(str, em.get('Parser').parserCss);
            return res;
        };

        // Show the blocks panel by default
        editor.on("load", () => {
            const openBl = editor.Panels.getButton('views', 'open-blocks');
            openBl && openBl.set('active', 1);
        });

    });
}

