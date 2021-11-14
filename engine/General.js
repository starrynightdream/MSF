// General.js
// 页面生成主方法

// todo 由设定导入需要使用的页面
// import settingPage from "/component/settingPage.js"
// import infoPage from "/component/infoPage.js"
// import contextPage from "/component/contextPage.js"

import pageState from "/component/pageState.js";

import System from "./System.js";
import SettingLoader from "./SettingLoader.js"
import util from "./util.js";

const resourcePath = 'resource/';
function _loadCss(href, resPath = resourcePath) {
    let gcss = document.createElement('link');
    gcss.rel = 'stylesheet';
    gcss.type = 'text/css';
    gcss.href = util.path.join(resPath, '/', href);
    document.head.appendChild(gcss);
}

async function _loadComponent(src) {
    let block = document.createElement('div');
    document.body.appendChild(block);
    System.reflesh.mountPageClass(block);
    let _component =  await import(src);
    console.log(_component)
    let _controler = _component.default.context(block, {
        infos: []
    });
    System.reflesh.registerConterol(_controler);
    return this;
}

async function _initProject(project) {
    // todo: change like project name to title
    // there to fix something in project
}

async function _loadTheme(theme) {

    if (Array.isArray(theme.grobalCSS)) {
        // each
        for (let item of theme.grobalCSS) {
            _loadCss(item, theme.resource);
        }
    // <link rel="stylesheet" href="resource/css/g.css"></link>
    } else {
        _loadCss(theme.grobalCSS, theme.resource);
    }

    for (let _com of theme.components) {
        // err: init err or to page err
        await _loadComponent( util.path.join('/', theme.componentRoot, _com));
    }
}


export default {
    async createMain(){
        // todo: create watting page
        let {project, theme} = SettingLoader.loadSetting();
        _initProject(project);
        _loadTheme(theme);

        // todo: make component load from setting

        /*
        let settingD = document.createElement('div');
        let infoD = document.createElement('div');
        let contextD = document.createElement('div');
        document.body.appendChild(settingD);
        document.body.appendChild(infoD);
        document.body.appendChild(contextD);

        System.reflesh.mountPageClass(settingD, infoD, contextD);

        let settingControl = settingPage.context(settingD, {
            infos: []
        });
        let infoControl = infoPage.context(infoD, {
            infos:'hello world in manager system'.split(' ')
        });
        let contextControl = contextPage.context(contextD, {
            infos: []
        });

        System.reflesh.registerConterol(settingControl, infoControl, contextControl);
        */

        // todo: end the wait page
        // setTimeout(() => {
        //     infoControl.cData({
        //         infos : `change data there`.split(' ')
        //     });
        // }, 1000);

        System.reflesh.toPage(pageState.pages[0]);

        // setTimeout(() => {
        //     this.trick()
        // }, 0);

        // infoD.classList.add("before")
        // settingD.classList.add("before")
        // contextD.classList.add("before")
    },

    // change class need in system, general just create page
    // trick (){
    //     infoD.classList.remove("before")
    //     infoD.classList.add("after")
    //     settingD.classList.remove("before")
    //     settingD.classList.add("after")
    //     contextD.classList.remove("before")
    //     contextD.classList.add("after")

    //     setTimeout(() => {
    //         contextD.classList.remove("after")
    //         contextD.classList.add("keep")
    //     }, 500);
    // }
}