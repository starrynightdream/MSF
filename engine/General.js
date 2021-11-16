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
import Net from "./Net.js";

async function _initProject(project) {
    // todo: change like project name to title
    // there to fix something in project
}

async function _loadTheme(theme) {

    if (Array.isArray(theme.grobalCSS)) {
        // each
        for (let item of theme.grobalCSS) {
            let _path =  util.path.join(theme.resource, item);
            await Net.loadCss(_path);
        }
    // <link rel="stylesheet" href="resource/css/g.css"></link>
    } else {
        let _path = util.path.join(theme.resource, theme.grobalCSS)
        await  Net.loadCss(_path);
    }

    for (let _com of theme.components) {
        let _src =  util.path.join('/', theme.componentRoot, _com);
        await Net.loadComponent(_src);
    }
}


export default {
    async createMain(){
        // todo: create watting page
        let {project, theme} = await SettingLoader.loadSetting();
        await _initProject(project);
        await _loadTheme(theme);

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