// General.js
// 页面生成主方法

// todo 由设定导入需要使用的页面
import settingPage from "../component/settingPage.js"
import infoPage from "../component/infoPage.js"
import contextPage from "../component/contextPage.js"

import pageState from "../component/pageState.js";

import System from "./System.js";
import SettingLoader from "./SettingLoader.js"
import util from "./util.js";

const SettingID = 'system_setting_page';
const InfoID = 'system_info_page';
const ContextID = 'system_context_page';

let settingD 
let infoD 
let contextD

let settingControl
let infoControl
let contextControl

export default {
    createMain(){
        settingD = document.getElementById(SettingID);
        infoD = document.getElementById(InfoID);
        contextD = document.getElementById(ContextID);
        System.reflesh.mountPageClass(settingD, infoD, contextD);

        settingControl = settingPage.context(settingD, {
            infos: []
        });
        infoControl = infoPage.context(infoD, {
            infos:'hello world in manager system'.split(' ')
        });
        contextControl = contextPage.context(contextD, {
            infos: []
        });

        System.reflesh.registerConterol(settingControl, infoControl, contextControl);

        setTimeout(() => {
            infoControl.cData({
                infos : `change data there`.split(' ')
            });
        }, 1000);

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