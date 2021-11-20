// infoPage.js
// 介绍的小页面的内容获取
import System from "../engine/System.js";
import util from "../engine/util.js";

function render(controler, data) {
    this._cRoot.innerHTML = '';
}

// bind state 1, 2, 3 and make it link to true logic
let inInfo = false;
function callPageChange(controller, pageName) {
    switch (pageName) {
    case 'home':
    case 'setting':
    case 'context':
        if (inInfo) {
            inInfo = false;
            _onOuterInfo(controller);
        }
        break;
    case 'info':
        inInfo = true;
        _onInfoPage(controller);
        break
    default:
        break;
    }
}

function _onOuterInfo(controler) {
    if (!controler.data.outerInfoRender) {
        controler.data.outerInfoRender = true;
    }
}

function _onInfoPage(controler) {

}

function _formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    _r.append(_staticPath());

    _r.appendChild(_render_root);
    return {
        _r, _render_root
    }
}

function _staticPath() {
    let _sr = document.createElement('div');
    util.dom.markCss(_sr, ['staticContain']);
    let _img = document.createElement('img');
    // todo: think about how make it settingable 
    _img.src = '/resource/imgs/koyi.jpg';
    util.dom.markCss(_img, ['staticImg']);
    // bug: img size bind what
    _sr.appendChild(_img);
    return _sr;
}

function item(data, idx, arr) {
    let _item = document.createElement('li');
    _item.innerHTML = `${idx}: ${data}`;
    return _item;
}

function _addListener(root) {
    // System.reflesh.addEve(root, 'click', ()=>{
    //     System.reflesh.toPage('defaultHome')
    // })

    System.reflesh.bindEve(root, 'click', () =>{
        System.reflesh.toPage('info');
    }, System.pageName, false, (val) =>{
        return val == 'defaultHome'
    });

    System.reflesh.bindEve(root, 'click', () =>{
        System.reflesh.toPage('defaultHome');
    }, System.pageName, false, (val) =>{
        return val != 'defaultHome'
    });
}

export default {
    defaultComponentName: 'infoPage',
    css: [],
    js: [],
    css_class: ['system_info_class'], //这个css class会被加载在父节点上
    context(root, data, name) {
        let {_r, _render_root} = _formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);

        let controller = {
            _name: name? name: this.defaultComponentName,
            _cRoot: _render_root,
            _fatherNode: root,
            cData (data) {
                render(this, data)
            },
        }

        _addListener(root);
        System.reflesh.mountPageClass(root);
        System.reflesh.bindPage(callPageChange);

        return controller;
    }
}