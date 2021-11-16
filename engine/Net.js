// Net.js
// 数据获取的窗口
import System from './System.js';

let curryTime = 20;
let _timeout = 2000;
async function loadCss(href) {
    let gcss = document.createElement('link');
    gcss.rel = 'stylesheet';
    gcss.type = 'text/css';
    gcss.href = href
    document.head.appendChild(gcss);
    return new Promise((resolve, reject) =>{
        if (gcss.attachEvent) {
            gcss.attachEvent('onload', resolve);
            return;
        }
        let _allTime = 0;
        let _interval = setInterval(() => {
            _allTime += curryTime;
            let loaded = false;
            // check brows
            if (/webkit/i.test(navigator.userAgent)) { 
                // webkit
                if (gcss.sheet) {
                    loaded = true;
                }
            } else if (gcss.sheet) {
                // ff
                try {
                    if (gcss.sheet.cssRules){
                        loaded = true;
                    }
                } catch (ex) {
                    loaded = true;
                }
            } else { // can't check
                setTimeout(resolve, _timeout);
            }
            if (loaded){
                clearInterval(_interval);
                resolve();
            }
            if (_allTime > _timeout){
                clearInterval(_interval);
                reject();
            }
        }, curryTime);
    });
}

async function loadComponent(src) {
    let block = document.createElement('div');
    document.body.appendChild(block);
    System.reflesh.mountPageClass(block);
    let _component =  await import(src);

    let _controler = _component.default.context(block, {
        infos: []
    });
    System.reflesh.registerConterol(_controler);
    return this;
}

export default{
    loadCss, loadComponent,
    getLocal(uri, {setting}){
    },
    getNetWork(url, {setting}){
    },
    getData(url, {setting}){
    },
    info(){
        return System.G.version;
    },
    test(code) {
        switch (code) {
            case 'setting':
                return [
                    ['测试1', 'setting'],
                    ['测试2', 'context'],
                    ['测试3', 'info'],
                    ['测试4', 'home'],
                    ['测试5', 'null'],
                ]
                break;
        
            default:
                break;
        }
    }
}