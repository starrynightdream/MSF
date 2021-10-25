// System.js
// 系统功能

// todo 由设定导入页面的自定义信息
import pageState from "../component/pageState.js";

const TransitionDefaultTime = 500;

// 全局函数
const G = {};

const _SYSG = {
    version: "1.0",
}

// 总理页面变化的数据结构
let _idx = 0;
let _pageArr = [];
const _pageChange = {
    getVal(keys, f) {

        if (typeof keys == 'string') {
            this._bindAKey(keys, f, keys);
        } else if (typeof keys == 'object') {

            keys.forEach(key => {
                this._bindAKey(key, f, keys);
            });
        } else {
            throw "can't bind keys with" + keys;
        }

        f(this._getValSilent(keys));
        return this;
    },
    setVal(keys, value) {

        this._setValSilent(keys, value);

        if (typeof keys == 'string') {
            this._cValCallBack(this._fArr[keys]);
        } else if (typeof keys == 'object') {
            let _tempset = new Set();
            if (Array.isArray(keys)) {

                for (let key in keys) {
                    this._cValCallBack(this._fArr[key], _tempset);
                }
            } else {

                for (let key in Object.keys(keys)) {
                    this._cValCallBack(this._fArr[key], _tempset);
                }
            }
        }

        return this;
    },
    mountPageClass(...nodes) {

        nodes.forEach(item => {
            this._nodeArr.push(item);
        });
    },
    registerConterol (...conterols) {

        for (let con of conterols) {
            this._conterol[con._name] = con;
        }
    },
    get conterols() {
        return this._conterol;
    },
    // todo: make auto mount eve call and disable eve call
    addEve (root,e_type, callback) {
        root.addEventListener(e_type, callback);
    },
    removeEve (root,e_type, callback) {
        root.removeEventListener(e_type, callback);
    },
    bindEve (root, e_type, callback, keys, catech = false) {
        let coverf = (e) =>{
            // i can add some eff there
            callback(e); 
        }

        let callf = (values) =>{

            if (values) {
                root.addEventListener(e_type, coverf, catech);
            } else {
                root.removeEventListener(e_type, coverf, catech)
            }
        }

        this.getVal(keys, callf); // bind callback
    },
    toPage(pname) {
        let _isinner = false;
        for (let _n in pageState.pages) {
            if (pname == _n) {
                _isinner = true;
                break;
            }
        }

        if (_isinner) {
            throw "目标页面不存在"
        }

        // history
        if (_idx < _pageArr.length) {
            _pageArr.splice(_idx + 1);
        }
        _pageArr.push({
            pname
        });

        // change environment
        // global css class change
        this._nodeArr.forEach(node=> {
            node.classList.remove(_SYSG.pageClass);
            node.classList.add(pageState.states[pname].class);
        });
        _SYSG.pageClass = pageState.states[pname].class;

        let enter = (time)=> {
            this._nodeArr.forEach( node =>{
                node.classList.remove('keep');
                node.classList.add('enter');
            });
            setTimeout(() => {
                keep();
            }, time);
        }

        let keep = () =>{
            this._nodeArr.forEach( node =>{
                node.classList.remove('enter');
                node.classList.add('keep');
            });
        }

        // todo: make time settingable 
        // and can skip the enter path
        setTimeout(() => {
            enter(TransitionDefaultTime);
        }, 0);

        // global attr change
        let _o = pageState.states[pname].state
        for(let key of Object.keys(_o)) {
            this.setVal(key, _o[key])
        }
    },
    _coverO : {},
    _nodeArr : [],
    _fArr : {},
    _conterol : {},
    _bindAKey(key, f, keys) {

        if (!this._coverO[key]) {
            this._coverO[key] = undefined;
            this._fArr[key] = [];
        }

        this._fArr[key].push({
            _f: f,
            _keys: keys
        });

        return this;
    },
    // 获取数据但并不绑定新的callback
    _getValSilent(keys) {

        if (typeof keys == 'string') {
            return this._coverO[keys];
        } else if (typeof keys == 'object') {
            let _o = {};
            for (let key in keys) {
                _o[key] = this._coverO[key];
            }
            return _o;
        }
    },
    _setValSilent(keys, vals) {
        if (typeof keys == 'string') {
            this._coverO[keys] = vals;
        } else if (typeof keys == 'object') {

            if (Array.isArray(keys)) {

                for (let idx of keys) {
                    this._coverO[keys[idx]] = vals[idx];
                }
            } else {

                for (let key of Object.keys(keys)) {
                    this._coverO[key] = keys[key];
                }
            }
        }

        return this;
    },
    _cValCallBack(calls, avoid = new Set()) {

        for (let _fo of calls) {

            if (avoid.has(_fo)) {} 
            else {
                _fo._f(this._getValSilent(_fo._keys));
                avoid.add(_fo);
            }
        }
        return avoid;
    },
}


function history(idx = 0) {
    // navi
    if (idx > 0) {
        // forword
    } else if (idx < 0) {
        // back
        if (-idx > _pageArr.length) {
            // tohome
        }
    } else {
        // reflesh
    }

}

export default {
    history,
    G,
    reflesh: _pageChange,
    _SYSG,
}