import React, { useEffect } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-webpage';
import basic from 'grapesjs-blocks-basic';
import forms from 'grapesjs-plugin-forms';
import pgexport from 'grapesjs-plugin-export';
import navbar from 'grapesjs-navbar';
import countdown from 'grapesjs-component-countdown';

import 'grapesjs/dist/css/grapes.min.css';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';

const svgNameList = ['column', '2columns', '3columns', '2col37', 'text', 'link', 'image', 'video', 'map', 'linkblock', 'quote', 'textsection', 'form','form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio', 'navbar', 'countdown'
];

const panelList = [];
panelList[1] = ['ti ti-device-desktop', 'ti ti-device-tablet', 'ti ti-device-mobile'];
panelList[0] = [];
panelList[2] = ['ti ti-marquee-2', '', 'ti ti-arrows-maximize', 'ti ti-code', '', '', 'ti ti-file-import', 'ti ti-eraser'];
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid','ti ti-puzzle'];

export default function Buidler(props) {
    const [editor, setEditor] = React.useState(null);

    useEffect(() => {
        let editor = grapesjs.init({
            fromElement: true,
            container: '#gjs',
            storageManager: {
                type: 'local',
                autoload: true,
                autosave: true,
                stepsBeforeSave: 1,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
            },
            plugins: [
                basic, plugin, forms, navbar, countdown, pgexport
            ],
        });
        
        editor.load();
        setEditor(editor);
      }, []);

    const onSelectEmailTemplate = (e) =>{
        var file = e.target.files[0];
        var reader = new FileReader();
        var html;
        console.log('here>>>>')
        reader.onloadend = function () {
            html = reader.result;
            console.log(html);
            editor.setComponents(html);
        };
        reader.readAsText(file, "UTF-8");
    }

    return (
        <>
            <input type="file" accept='.html,.html' onChange={(e) => onSelectEmailTemplate(e)} style={{position:"fixed",top:'10px',left:'10px',width:'90px',zIndex:'4'}} />
            <div id="gjs">
            </div>
        </>
    );
}