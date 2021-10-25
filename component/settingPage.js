// settingPage.js
// 设置选项页面的内容获取

import System from "../engine/System.js";

let _h5OnHomePage = {};

function _onHomePage (){
    // 进行全节点的渲染
    if (!_h5OnHomePage.render) {
        // 表示已经渲染过
    }

    // 执行动态数据的渲染结果
    return {
        _r, _render_root
    };
}

/**
 * 根据data响应信息
 * @param {*} data 
 * @returns 
 */
function formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    let _items = data.infos.map(item);

    System.reflesh.mountPageClass(..._items);

    let _head = head(data);
    _head?  _r.appendChild(_head): null;

    _items.forEach( (item) =>{
        _render_root.appendChild(item)
    });
    _r.appendChild(_render_root);
    return {
        _r, _render_root
    }
}

function head(data) {
    return null;
}

function item(data, idx, arr) {
    let _item = document.createElement('li');
    _item.innerHTML = `${idx}: ${data}`;
    return _item;
}

function addListener(root) {
    System.reflesh.bindEve(root, 'click', (e) =>{
        System.reflesh.toPage('setting')
    }, 'home')
}

export default {
    defaultComponentName: 'settingPage',
    css: [],
    js: [],
    css_class: ['system_setting_class'], //这个css class会被加载在父节点上
    context(root, data, name) {
        let {_r, _render_root} = formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);

        addListener(root)

        return {
            _name: name? name: this.defaultComponentName,
            _cRoot: _render_root,
            _fatherNode: root,
            cData (data) {
                this._cRoot.innerHTML = ''
                let _items = data.infos.map(item);
                _items.forEach( (item) =>{
                    _render_root.appendChild(item)
                });
            },
        }
    }
}