// SettingLoader.js
// 读取设置
import util from "./util.js";
const path = util.path;

const PROJECT_JSON_PATH = '/project.json';
const ToProjectBase = '../';

function loadSetting (url = path.join(ToProjectBase, PROJECT_JSON_PATH), isAsync = false) {
    let request = new XMLHttpRequest();
    request.open('GET', url, isAsync);
    // request.responseType = 'json';

    let themeReq = new XMLHttpRequest();;
    // themeReq.responseType = 'json';
    themeReq.onload = function() {
    }

    request.onload = function (){
        let res = JSON.parse(request.response);
        themeReq.open('GET', path.join(ToProjectBase, res.theme), isAsync);
        themeReq.send();
    }

    request.send();
    return {
        "project" : JSON.parse(request.response),
        "theme":  JSON.parse(themeReq.response),
    }
}


export default{
    loadSetting
}