// infoPage.js
// 介绍的小页面的内容获取

function formPage(data) {
    let _r = document.createElement('div');
    let _render_root  = document.createElement('div');
    let _items = data.infos.map(item);

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

export default {
    css: [],
    js: [],
    css_class: ['system_info_class'],
    context(root, data) {
        let {_r, _render_root} = formPage(data);
        root.appendChild(_r);
        root.classList.add(this.css_class);
        return {
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