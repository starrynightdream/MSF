// infoPage.js
// 介绍的小页面的内容获取
import System from "../engine/System.js";

function _formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    let _items = data.infos.map(item);

    System.reflesh.mountPageClass(..._items);

    _r.appendChild(head(data));
    _items.forEach( (item) =>{
        _render_root.appendChild(item)
    });
    _r.appendChild(_render_root);
    return {
        _r, _render_root
    }
}

function head(data) {
    let _head = document.createElement('div');
    _head.innerHTML = '<h1>head</h1>';
    return _head;
}

function item(data, idx, arr) {
    let _item = document.createElement('li');
    _item.innerHTML = `${idx}: ${data}`;
    return _item;
}

function _addListener(root) {
    System.reflesh.addEve(root, 'click', ()=>{
        System.reflesh.toPage('defaultHome')
    })
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
                this._cRoot.innerHTML = ''
                let _items = data.infos.map(item);
                _items.forEach( (item) =>{
                    _render_root.appendChild(item)
                });
            },
        }

        _addListener(root)
        System.reflesh.mountPageClass(root)

        return controller;
    }
}