// settingPage.js
// 设置选项页面的内容获取

import System from "../engine/System.js";
import Net from "../engine/Net.js";


// get active child node by data
function render(control, data){
    this._cRoot.innerHTML = '';
    let _items = data.infos.map(item);
    _items.forEach( (item) =>{
        _render_root.appendChild(item)
    });
}

function callPageChange(controller, pageName) {
    switch (pageName) {
    case 'defaultHome':
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
    let data = Net.test('setting');
    let _items = data.map(_item);
    _items.forEach(item=>{
        controller.data._cRoot.appendChild(item);
    });
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

/**
 * 给予渲染结果的根节点，给予动态数据根节点以便
 * 任务是初始化页面结构，使得页面可以进行：数据的动态渲染，在不同页面组织不同表现形势
 * @param {*} data 
 * @returns 
 */
function _formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    _r.appendChild(_render_root);
    return {
        _r, _render_root
    }
}

function _item(data, idx, arr) {
    let _node = document.createElement('div');
    _node.classList.add('item');
    _node.innerHTML = `
    <h1>${data[0]}</h1>
    `
    return _node;
}

function _addListener(root) {
    // System.reflesh.bindEve(root, 'click', (e) =>{
    //     System.reflesh.toPage('setting')
    // }, 'home')
    System.reflesh.addEve(root, 'click', ()=>{
        System.reflesh.toPage('setting');
    });
}

export default {
    defaultComponentName: 'settingPage',
    css: [],
    js: [],
    css_class: ['system_setting_class'], //这个css class会被加载在父节点上
    context(root, data, name) { // get controler
        let {_r, _render_root} = _formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);

        let controller = {
            _name: name? name: this.defaultComponentName,
            _fatherNode: root,
            data: { //user save the data they want
                _cRoot: _render_root, //快速渲染动态的数据节点
            },
            // the way change data for rander
            cData (_data) {
                render(this, _data);
            },
        }


        // bind reflesh
        _addListener(root)

        System.reflesh.bindPage((pn) =>{
            callPageChange(controller, pn);
        });

        // return controler for system control. 
        // for component talk each other
        return controller;
    }
}