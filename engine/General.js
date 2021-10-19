// General.js
// 页面生成主方法
// import settingPage from "../component/settingPage.js"
import infoPage from "../component/infoPage.js"
// import contextPage from "../component/contextPage.js"

const SettingID = 'system_setting_page';
const InfoID = 'system_info_page';
const ContextID = 'system_context_page';

let settingD 
let infoD 
let contextD


export default {
    createMain(){
        settingD = document.getElementById(SettingID)
        infoD = document.getElementById(InfoID)
        contextD = document.getElementById(ContextID)

        infoD.innerHTML = infoPage.context("test");

        infoD.classList.add("before")
        settingD.classList.add("before")
        contextD.classList.add("before")
    },

    trick (){
        infoD.classList.remove("before")
        infoD.classList.add("after")
        settingD.classList.remove("before")
        settingD.classList.add("after")
        contextD.classList.remove("before")
        contextD.classList.add("after")
    }
}