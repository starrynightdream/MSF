// contextPage.js
// 内容页面的内容获取

import System from "../engine/System.js";
import settingPage from "./settingPage.js";

function render(controller, data){
    this._cRoot.innerHTML = ''
    let _items = data.infos.map(item);
    _items.forEach( (item) =>{
        controller._render_root.appendChild(item)
    });
}

function callPageChange(controller, pageName) {
    switch (pageName) {
    case 'home':
        _onHomePage(controller);
        break;
    case 'setting':
        _onSettingPage(controller);
        break;
    case 'info':
        _onInfoPage(controller);
        break
    case 'context':
        _onContextPage(controller);
        break;
    default:
        break;
    }
}

function _onHomePage (controller){
    // 进行全节点的渲染
    if (!controller.data.homeRender) {
        // 表示已经渲染过
        controller.data.homeRender = true;
        controller.data.homeH5 = '';
    } else {
        // 使用重复数据
    }
    controller.data._cRoot.innerHTML = '';
}

function _onSettingPage (controller) {
    if (!controller.data.settingRender) {
        controller.data.settingRender = true;
    }
    controller.data._cRoot.innerHTML = '';

    controller.data._cRoot.classList.add('buttonGroup');
}

function _onContextPage(controller){
    // 进行全节点的渲染
    if (!controller.data.homeRender) {
        // 表示已经渲染过
        controller.data.homeRender = true;
        controller.data.homeH5 = '';
    } else {
        // 使用重复数据
    }
    controller.data._cRoot.innerHTML = '';
}

function _onInfoPage (controller){
    // 进行全节点的渲染
    if (!controller.data.homeRender) {
        // 表示已经渲染过
        controller.data.homeRender = true;
        controller.data.homeH5 = '';
    } else {
        // 使用重复数据
    }
    controller.data._cRoot.innerHTML = '';
}

function _formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    _r.appendChild(_render_root);
    return {
        _r, _render_root
    }
}

function _item(data, idx, arr) {
}

function mouseover(e) {
    let conters = System.reflesh.conterols;
    conters[settingPage.defaultComponentName]._fatherNode.classList.add('pull_left');
}

function mouseout (e) {
    let conters = System.reflesh.conterols;
    conters[settingPage.defaultComponentName]._fatherNode.classList.remove('pull_left');
}

function click (e){
    System.reflesh.toPage('context')
}

function addListener(root){
    // System.reflesh.addEve(root, 'mouseover', mouseover);
    // System.reflesh.addEve(root, 'mouseout', mouseout);

    System.reflesh.bindEve(root, 'mouseover', mouseover, 'home');
    System.reflesh.bindEve(root, 'mouseout', mouseout, 'home');
    // todo: simply computed attr
    // System.reflesh.addEve(root, 'click', click);
    System.reflesh.bindEve(root, 'click', click, System.pageName, false, (val) =>{
        return val !== 'context';
    });
}

// function removeListener(root) {
//     System.reflesh.removeEve(root, 'mouseover', mouseover);
//     System.reflesh.removeEve(root, 'mouseout', mouseout);
// }

export default {
    defaultComponentName: 'contextPage',
    css: [],
    js: [],
    css_class: ['system_context_class'], //这个css class会被加载在父节点上
    context(root, data, name) {
        let {_r, _render_root} = _formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);

        let controller = {
            _name: name?name : this.defaultComponentName,
            _fatherNode: root,
            data: {
                _cRoot: _render_root,
            },
            cData (_data) {
                render(this, _data);
            },
        };

        System.reflesh.mountPageClass(root);
        System.reflesh.bindPage(callPageChange);
        addListener(root);
        return controller;
    }
}