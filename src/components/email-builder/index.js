import React, {useEffect, useState} from 'react';
import GrapesJS from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic';
import addExportPlugin from './plugins/exporter';
import { exporterPluginRef } from './plugins/exporter/consts'
import 'grapesjs/dist/css/grapes.min.css';
import './style.css';

const App = () => {

    const [pluginLoaded, setPluginLoaded] = useState(false);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (!pluginLoaded) {
            addExportPlugin({onDownloadTemplate});
            setPluginLoaded(true);
        }
        if (!editor) {
            const e = GrapesJS.init({
                container: `#email-template-builder`,
                fromElement: true,
                plugins: [gjsBasicBlocks, exporterPluginRef]
            });
            setEditor(e);
        }
    }, [editor, pluginLoaded]);

    const onDownloadTemplate = (html, css) => {
        console.log(html)
        console.log("==============")
        console.log(css)
    }

    return (
        <>
            <div id="email-template-builder"/>
        </>
    );
}

export default App;
