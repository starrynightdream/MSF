// settingPage.js
// 设置选项页面的内容获取

import System from "../engine/System.js";

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

export default {
    defaultComponentName: 'settingPage',
    css: [],
    js: [],
    css_class: ['system_setting_class'], //这个css class会被加载在父节点上
    context(root, data, name) {
        let {_r, _render_root} = formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);

        return {
            _name: name? name: this.defaultComponentName,
            _cRoot: _render_root,
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